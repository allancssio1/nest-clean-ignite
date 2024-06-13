import { test, expect, describe, beforeEach } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { FetchQuestionAnswersUseCase } from './fetch-questions-answers'
import { makeAnswer } from '#/factories/make-answer'
import { AnswerAttachmentsRepositoryInMemory } from '#/repositories/answers-attachments-repository-in-memory'

describe('Fetch Question Answers', () => {
  let answersRepository: AnswersRepositoryInMemory
  let answerAttachmentsRepository: AnswerAttachmentsRepositoryInMemory
  let sut: FetchQuestionAnswersUseCase

  beforeEach(async () => {
    answerAttachmentsRepository = new AnswerAttachmentsRepositoryInMemory()
    answersRepository = new AnswersRepositoryInMemory(
      answerAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(answersRepository)
  })
  test('Should be able fetch question answers', async () => {
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const res = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(res.value?.answers).toHaveLength(3)
    expect(res.value?.answers[0].questionId.toString()).toEqual('question-1')
  })
  test('Should be able fetch paginated question answers', async () => {
    for (let i = 0; i < 22; i++) {
      await answersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }
    const res = await sut.execute({ page: 2, questionId: 'question-1' })

    expect(res.value?.answers).toHaveLength(2)
  })
})
