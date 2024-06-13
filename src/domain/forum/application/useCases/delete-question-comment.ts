import { Either, left, right } from '@/core/Either'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { QuestionCommentsRepsitory } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepsitory) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) return left(new ResourceNotFoundError())

    if (questionComment.authorId.toString() !== authorId)
      return left(new UnauthorazedError())

    await this.questionCommentRepository.delete(questionComment)
    return right(null)
  }
}
