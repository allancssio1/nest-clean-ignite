import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/AnswerAttachment'
import { PrismaService } from '../pisma.services'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  constructor(private readonly prisma: PrismaService) {}
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }
  deleteByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
