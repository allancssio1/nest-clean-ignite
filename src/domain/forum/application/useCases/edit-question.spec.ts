import { beforeEach, describe, expect, test } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'
import { makeQuestionAttachment } from '#/factories/make-question-attachment'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { Question } from '../../enterprise/entities/Question'

describe('Edit Question', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let questionAttachmentsRepository: QuestionAttachmentsRepositoryInMemory
  let sut: EditQuestionUseCase
  let newQuestion: Question
  // let newQuestionAttachment: QuestionAttachment

  beforeEach(() => {
    questionAttachmentsRepository = new QuestionAttachmentsRepositoryInMemory()
    questionsRepository = new QuestionsRepositoryInMemory(
      questionAttachmentsRepository,
    )
    sut = new EditQuestionUseCase(
      questionsRepository,
      questionAttachmentsRepository,
    )

    newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-2') })

    questionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    questionsRepository.create(newQuestion)
  })
  test('Should be able edit a question', async () => {
    const res = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-2',
      content: 'new Content',
      title: 'new title',
      attachmentsIds: ['1', '3'],
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)

    expect(questionsRepository.items[0].attachments.currentItems).toHaveLength(
      2,
    )
    expect(questionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
    expect(questionsRepository.items[0]).toMatchObject({
      content: 'new Content',
      title: 'new title',
    })
  })
  test('Should not be  able edit a question from another user', async () => {
    const res = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      content: 'new Content',
      title: 'new title',
      attachmentsIds: ['1', '3'],
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
    expect(res.value).toBeInstanceOf(UnauthorazedError)
  })
})
