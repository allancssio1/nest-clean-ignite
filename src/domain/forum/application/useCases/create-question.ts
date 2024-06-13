import { Either, right } from '@/core/Either'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Question } from '../../enterprise/entities/Question'
import { QuestionAttachment } from '../../enterprise/entities/QuestionAttachment'
import { QuestionAttachmentList } from '../../enterprise/entities/QuestionAttachmentList'
import { QuestionsRepsitory } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}
type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepsitory) {}

  async execute({
    authorId,
    content,
    title,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    this.questionRepository.create(question)

    return right({ question })
  }
}
