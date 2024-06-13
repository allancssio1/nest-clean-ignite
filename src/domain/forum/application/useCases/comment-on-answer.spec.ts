import { test, expect, describe, beforeEach } from 'vitest'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/useCases/comment-on-answer'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { AnswerCommentsRepositoryInMemory } from '#/repositories/answer-comments-repository-in-memory'
import { makeAnswer } from '#/factories/make-answer'
import { AnswerAttachmentsRepositoryInMemory } from '#/repositories/answers-attachments-repository-in-memory'
import { Answer } from '../../enterprise/entities/Answer'

describe('Create Answer', () => {
  let answersRepository: AnswersRepositoryInMemory
  let answerAttachementRepository: AnswerAttachmentsRepositoryInMemory
  let answerCommentsRepository: AnswerCommentsRepositoryInMemory
  let sut: CommentOnAnswerUseCase
  let answer: Answer

  beforeEach(() => {
    answerAttachementRepository = new AnswerAttachmentsRepositoryInMemory()
    answersRepository = new AnswersRepositoryInMemory(
      answerAttachementRepository,
    )
    answerCommentsRepository = new AnswerCommentsRepositoryInMemory()
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answerCommentsRepository,
    )
    answer = makeAnswer()

    answersRepository.create(answer)
  })
  test('Should be able create an answer comment', async () => {
    const res = await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Novo comentário',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
  })
})
