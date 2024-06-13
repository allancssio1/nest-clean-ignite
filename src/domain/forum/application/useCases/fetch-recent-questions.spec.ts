import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'

describe('Fetch Questions Recents', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let questionAttachmentsRepository: QuestionAttachmentsRepositoryInMemory
  let sut: FetchRecentQuestionsUseCase

  beforeEach(async () => {
    questionAttachmentsRepository = new QuestionAttachmentsRepositoryInMemory()
    questionsRepository = new QuestionsRepositoryInMemory(
      questionAttachmentsRepository,
    )
    sut = new FetchRecentQuestionsUseCase(questionsRepository)
  })
  test('Should be able fetch question recents ordenate by createdAt', async () => {
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 2) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 1) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 4) }),
    )
    const res = await sut.execute({ page: 1 })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(res.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 4) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 2) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 1) }),
    ])
  })
  test('Should be able fetch questions recents by pages', async () => {
    for (let i = 0; i < 22; i++) {
      await questionsRepository.create(makeQuestion())
    }
    const res = await sut.execute({ page: 2 })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(res.value?.questions).toHaveLength(2)
  })
})
