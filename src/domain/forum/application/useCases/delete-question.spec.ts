import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'
import { makeQuestionAttachment } from '#/factories/make-question-attachment'
import { Question } from '../../enterprise/entities/Question'

describe('Delete Question', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let questionAttachmentssRepository: QuestionAttachmentsRepositoryInMemory
  let sut: DeleteQuestionUseCase
  let newQuestion: Question

  beforeEach(() => {
    questionAttachmentssRepository = new QuestionAttachmentsRepositoryInMemory()
    questionsRepository = new QuestionsRepositoryInMemory(
      questionAttachmentssRepository,
    )
    sut = new DeleteQuestionUseCase(questionsRepository)
    newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    questionAttachmentssRepository.items.push(
      makeQuestionAttachment({ questionId: newQuestion.id }),
    )
    questionsRepository.create(newQuestion)
  })
  test('Should be able delete a question', async () => {
    const res = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(questionsRepository.items).toHaveLength(0)
    expect(questionAttachmentssRepository.items).toHaveLength(0)
  })
  test('Should not be  able delete a question from another user', async () => {
    const res = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
    expect(questionsRepository.items).toHaveLength(1)
    expect(questionAttachmentssRepository.items).toHaveLength(1)
  })
})
