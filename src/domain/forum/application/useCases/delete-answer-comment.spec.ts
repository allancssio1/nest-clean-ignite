import { beforeEach, describe, expect, test } from 'vitest'
import { AnswerCommentsRepositoryInMemory } from '#/repositories/answer-comments-repository-in-memory'
import { makeAnswerComment } from '#/factories/make-answer-comment'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { AnswerComment } from '../../enterprise/entities/AnswerComment'

describe('Delete Answer Comment', () => {
  let answercommentsRepository: AnswerCommentsRepositoryInMemory
  let sut: DeleteAnswerCommentUseCase
  let newAnswerComment: AnswerComment

  beforeEach(() => {
    answercommentsRepository = new AnswerCommentsRepositoryInMemory()
    sut = new DeleteAnswerCommentUseCase(answercommentsRepository)

    newAnswerComment = makeAnswerComment()
    answercommentsRepository.create(newAnswerComment)
  })
  test('Should be able delete a answer comment', async () => {
    const res = await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerCommentId: newAnswerComment.id.toString(),
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(answercommentsRepository.items).toHaveLength(0)
  })
  test('Should not be  able delete a answer comment from another user', async () => {
    const res = await sut.execute({
      authorId: 'Wrong author',
      answerCommentId: newAnswerComment.id.toString(),
    })

    expect(res.isLeft()).toBe(true)
    expect(res.isRight()).toBe(false)
    expect(res.value).toBeInstanceOf(UnauthorazedError)
  })
})
