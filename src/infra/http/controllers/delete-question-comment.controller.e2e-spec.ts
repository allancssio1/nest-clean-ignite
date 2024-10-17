import { QuestionFactory } from '#/factories/make-question'
import { makeQuestionComment, QuestionCommentFactory } from '#/factories/make-question-comment'
import { StudentFactory } from '#/factories/make-student'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/pisma.services'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Delete question comment (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let questionCommentFactory: QuestionCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    questionFactory = moduleRef.get(QuestionFactory)
    questionCommentFactory = moduleRef.get(QuestionCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /questions/comment/:commentId', async () => {
    const user = await studentFactory.makePrismaStudent()

    const access_token = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const comment = await questionCommentFactory.makePrismaQuestionComment({
      authorId: user.id,
      questionId: question.id
    })

    const response = await request(app.getHttpServer())
      .delete(`/questions/comments/${comment.id.toString()}`)
      .set({ Authorization: `Bearer ${access_token}` })
      .send()

    // const commentOnDB = await prisma.comment.findFirst({
    //   where: {
    //     id: comment.id.toString()
    //   }
    // })
    
    expect(response.statusCode).toBe(204)
    // expect(commentOnDB).toBe(false)
  })
})
