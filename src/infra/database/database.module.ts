import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/pisma.services'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'

@Module({
  providers: [
    PrismaService,
    { provide: QuestionsRepository, useClass: PrismaQuestionsRepository },
    { provide: StudentsRepository, useClass: PrismaStudentsRepository },
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerRepository,
    PrismaQuestionCommentsRepository,
  ],
  exports: [
    PrismaService,
    // PrismaQuestionsRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerRepository,
    PrismaQuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
