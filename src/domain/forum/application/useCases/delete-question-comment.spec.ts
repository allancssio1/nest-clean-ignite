import { beforeEach, describe, expect, test } from 'vitest'
import { QuestionCommentsRepositoryInMemory } from '#/repositories/questions-comments-repository-in-memory'
import { makeQuestionComment } from '#/factories/make-question-comment'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { QuestionComment } from '../../enterprise/entities/QuestionComment'

describe('Delete Question Comment', () => {
  let questioncommentsRepository: QuestionCommentsRepositoryInMemory
  let sut: DeleteQuestionCommentUseCase
  let newQuestionComment: QuestionComment

  beforeEach(() => {
    questioncommentsRepository = new QuestionCommentsRepositoryInMemory()
    sut = new DeleteQuestionCommentUseCase(questioncommentsRepository)

    newQuestionComment = makeQuestionComment()
    questioncommentsRepository.create(newQuestionComment)
  })
  test('Should be able delete a question comment', async () => {
    const res = await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(questioncommentsRepository.items).toHaveLength(0)
  })
  test('Should not be  able delete a question comment from another user', async () => {
    const res = await sut.execute({
      authorId: 'author wrong',
      questionCommentId: newQuestionComment.id.toString(),
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
  })
})
