import { test, expect, describe, beforeEach } from 'vitest'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'
import { Question } from '../../enterprise/entities/Question'

describe('Get Question By Slug', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let questionAttachmentsRepository: QuestionAttachmentsRepositoryInMemory
  let sut: GetQuestionBySlugUseCase
  let newQuestion: Question

  beforeEach(() => {
    questionAttachmentsRepository = new QuestionAttachmentsRepositoryInMemory()
    questionsRepository = new QuestionsRepositoryInMemory(
      questionAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(questionsRepository)
    newQuestion = makeQuestion({ title: 'New Question' })

    questionsRepository.create(newQuestion)
  })
  test('Should be able create an answer', async () => {
    const res = await sut.execute({ slug: 'new-question' })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(res.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
