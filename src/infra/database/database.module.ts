import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/pisma.services'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaQuestionCommentsRepsitory } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepsitory } from './prisma/repositories/prisma-questions-repository'

@Module({
  providers: [
    PrismaService,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerRepository,
    PrismaQuestionCommentsRepsitory,
    PrismaQuestionsRepsitory,
  ],
  exports: [
    PrismaService,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerRepository,
    PrismaQuestionCommentsRepsitory,
    PrismaQuestionsRepsitory,
  ],
})
export class DatabaseModule {}
