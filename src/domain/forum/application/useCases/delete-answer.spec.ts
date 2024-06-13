import { test, expect, describe, beforeEach } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { makeAnswer } from '#/factories/make-answer'
import { AnswerAttachmentsRepositoryInMemory } from '#/repositories/answers-attachments-repository-in-memory'
import { makeAnswerAttachment } from '#/factories/make-answer-attachment'
import { Answer } from '../../enterprise/entities/Answer'

describe('Delete Answer', () => {
  let answersRepository: AnswersRepositoryInMemory
  let answersAttachmentsRepository: AnswerAttachmentsRepositoryInMemory
  let sut: DeleteAnswerUseCase
  let newAnswer: Answer

  beforeEach(() => {
    answersAttachmentsRepository = new AnswerAttachmentsRepositoryInMemory()
    answersRepository = new AnswersRepositoryInMemory(
      answersAttachmentsRepository,
    )
    sut = new DeleteAnswerUseCase(answersRepository)

    newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    answersAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
      }),
    )

    answersRepository.create(newAnswer)
  })
  test('Should be able delete a answer', async () => {
    const res = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(answersRepository.items).toHaveLength(0)
  })
  test('Should not be  able delete a answer from another user', async () => {
    const res = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
  })
})
