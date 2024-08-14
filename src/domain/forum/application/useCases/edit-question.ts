import { Either, left, right } from '@/core/Either'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { QuestionAttachment } from '../../enterprise/entities/QuestionAttachment'
import { QuestionAttachmentList } from '../../enterprise/entities/QuestionAttachmentList'
import { QuestionAttachmentRepository } from '../repositories/question-attachments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/Question'
import { Injectable } from '@nestjs/common'

interface EditQuestionUseCaseProps {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}
type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  {
    question: Question
  }
>

@Injectable()
export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentRepository,
  ) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
    attachmentsIds,
  }: EditQuestionUseCaseProps): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())

    if (question.authorId.toString() !== authorId)
      return left(new UnauthorazedError())

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)
    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachmens = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachmens)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionRepository.save(question)

    return right({ question })
  }
}
