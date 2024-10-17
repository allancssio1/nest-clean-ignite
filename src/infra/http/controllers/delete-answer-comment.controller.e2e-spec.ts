import { AnswerFactory } from '#/factories/make-answer'
import { makeAnswerComment, AnswerCommentFactory } from '#/factories/make-answer-comment'
import { QuestionFactory } from '#/factories/make-question'
import { StudentFactory } from '#/factories/make-student'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/pisma.services'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Delete answer comment (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let answerCommentFactory: AnswerCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, AnswerFactory, AnswerCommentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerCommentFactory = moduleRef.get(AnswerCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /answers/comment/:commentId', async () => {
    const user = await studentFactory.makePrismaStudent()

    const access_token = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id
    })

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id
    })

    const comment = await answerCommentFactory.makePrismaAnswerComment({
      authorId: user.id,
      answerId: answer.id
    })

    const response = await request(app.getHttpServer())
      .delete(`/answers/comments/${comment.id.toString()}`)
      .set({ Authorization: `Bearer ${access_token}` })
      .send()

    const commentOnDB = await prisma.comment.findFirst({
      where: {
        id: comment.id.toString()
      }
    })
    
    expect(response.statusCode).toBe(204)
    expect(commentOnDB).toBe(null)
  })
})
