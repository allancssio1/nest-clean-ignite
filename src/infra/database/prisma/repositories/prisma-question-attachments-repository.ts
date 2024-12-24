import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/QuestionAttachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../pisma.services'
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper '

@Injectable()
export class PrismaQuestionAttachmentRepository
  implements QuestionAttachmentRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questions = await this.prisma.attachment.findMany({
      where: { questionId },
    })

    return questions.map(PrismaQuestionAttachmentMapper.toDomain)
  }
  async deleteByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({ where: { questionId } })
  }
  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }

    const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }

    const attachmentIds = attachments.map((attachment) =>
      attachment.id.toString(),
    )

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentIds,
        },
      },
    })
  }
}
