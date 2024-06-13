import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Either, left, right } from '@/core/Either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { AnswerComment } from '../../enterprise/entities/AnswerComment'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'
import { AnswerRepository } from '../repositories/answer-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}
type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())
    const answerComment = await this.answerCommentRepository.create(
      AnswerComment.create({
        authorId: new UniqueEntityId(authorId),
        content,
        answerId: answer.id,
      }),
    )

    return right({ answerComment })
  }
}
