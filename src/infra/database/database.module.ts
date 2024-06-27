import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/pisma.services'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaQuestionCommentsRepsitory } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepsitory } from './prisma/repositories/prisma-questions-repository'
import { QuestionsRepsitory } from '@/domain/forum/application/repositories/questions-repository'

@Module({
  providers: [
    PrismaService,
    { provide: QuestionsRepsitory, useClass: PrismaQuestionsRepsitory },
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerRepository,
    PrismaQuestionCommentsRepsitory,
  ],
  exports: [
    PrismaService,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerRepository,
    PrismaQuestionCommentsRepsitory,
    QuestionsRepsitory,
  ],
})
export class DatabaseModule {}
