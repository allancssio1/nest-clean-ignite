import { test, expect, describe, beforeEach } from 'vitest'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/useCases/comment-on-question'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { QuestionCommentsRepositoryInMemory } from '#/repositories/questions-comments-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'
import { Question } from '../../enterprise/entities/Question'

describe('Create Question', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let questionAttachmentsRepositoryInMemory: QuestionAttachmentsRepositoryInMemory
  let questionCommentsRepository: QuestionCommentsRepositoryInMemory
  let sut: CommentOnQuestionUseCase
  let question: Question

  beforeEach(() => {
    questionAttachmentsRepositoryInMemory =
      new QuestionAttachmentsRepositoryInMemory()
    questionsRepository = new QuestionsRepositoryInMemory(
      questionAttachmentsRepositoryInMemory,
    )
    questionCommentsRepository = new QuestionCommentsRepositoryInMemory()
    sut = new CommentOnQuestionUseCase(
      questionsRepository,
      questionCommentsRepository,
    )
    question = makeQuestion()

    questionsRepository.create(question)
  })
  test('Should be able create an question comment', async () => {
    const res = await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'Novo comentário',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
  })
})
