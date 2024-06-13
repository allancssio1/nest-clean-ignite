import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Either, left, right } from '@/core/Either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { QuestionComment } from '../../enterprise/entities/QuestionComment'
import { QuestionCommentsRepsitory } from '../repositories/question-comments-repository'
import { QuestionsRepsitory } from '../repositories/questions-repository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}
type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepsitory,
    private questionCommentRepository: QuestionCommentsRepsitory,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())

    const questionComment = await this.questionCommentRepository.create(
      QuestionComment.create({
        authorId: new UniqueEntityId(authorId),
        content,
        questionId: question.id,
      }),
    )

    return right({ questionComment })
  }
}
