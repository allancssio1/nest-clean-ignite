import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/AnswerAttachment'
import { PrismaService } from '../pisma.services'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper '

@Injectable()
export class PrismaAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findManyByAnswerId(questionId: string): Promise<AnswerAttachment[]> {
    const answers = await this.prisma.attachment.findMany({
      where: { questionId },
    })

    return answers.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteByAnswerId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({ where: { questionId } })
  }
}
