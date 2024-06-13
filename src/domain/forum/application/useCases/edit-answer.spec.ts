import { beforeEach, describe, expect, test } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { makeAnswer } from '#/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerAttachmentsRepositoryInMemory } from '#/repositories/answers-attachments-repository-in-memory'
import { makeAnswerAttachment } from '#/factories/make-answer-attachment'
import { Answer } from '../../enterprise/entities/Answer'

describe('Edit Answer', () => {
  let answersRepository: AnswersRepositoryInMemory
  let answerAttachmentsRepository: AnswerAttachmentsRepositoryInMemory
  let sut: EditAnswerUseCase
  let newAnswer: Answer

  beforeEach(() => {
    answerAttachmentsRepository = new AnswerAttachmentsRepositoryInMemory()
    answersRepository = new AnswersRepositoryInMemory(
      answerAttachmentsRepository,
    )
    sut = new EditAnswerUseCase(answersRepository, answerAttachmentsRepository)

    newAnswer = makeAnswer({ authorId: new UniqueEntityId('author-1') })

    answerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    answersRepository.create(newAnswer)
  })
  test('Should be able edit a answer', async () => {
    const res = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'new Content',
      attachmentsIds: ['1', '3'],
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(answersRepository.items[0]).toMatchObject({
      content: 'new Content',
    })
    expect(answersRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(answersRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })
  test('Should not be  able edit a answer from another user', async () => {
    const res = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-2',
      content: 'new Content',
      attachmentsIds: ['1', '3'],
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
  })
})
