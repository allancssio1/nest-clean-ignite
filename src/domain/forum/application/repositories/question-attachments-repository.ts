import { QuestionAttachment } from '../../enterprise/entities/QuestionAttachment'

export abstract class QuestionAttachmentRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>
  abstract deleteByQuestionId(questionId: string): Promise<void>
}
