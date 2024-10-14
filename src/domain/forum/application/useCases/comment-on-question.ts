import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Either, left, right } from '@/core/Either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { QuestionComment } from '../../enterprise/entities/QuestionComment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Injectable } from '@nestjs/common'

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
@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentRepository: QuestionCommentsRepository,
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
