import { AnswerAttachment } from '../../enterprise/entities/AnswerAttachment'

export abstract class AnswerAttachmentRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract deleteByAnswerId(answerId: string): Promise<void>
  abstract createMany(attachments: AnswerAttachment[]): Promise<void>
  abstract deleteMany(attachments: AnswerAttachment[]): Promise<void>
}
