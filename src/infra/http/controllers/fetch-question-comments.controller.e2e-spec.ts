import { QuestionCommentFactory } from '#/factories/make-question-comment'
import { QuestionFactory } from '#/factories/make-question'
import { StudentFactory } from '#/factories/make-student'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/pisma.services'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch  Questions Comments (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionCommentFactory: QuestionCommentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile()

    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionCommentFactory = moduleRef.get(QuestionCommentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[GET] /questions/:questionId/comments', async () => {
    const user = await studentFactory.makePrismaStudent({
      email: 'johndoe@example.com',
      password: '123456',
    })
    const access_token = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    Promise.all([
      await questionCommentFactory.makePrismaQuestionComment({
        questionId: question.id,
        authorId: user.id,
        content: 'comment 01',
      }),
      await questionCommentFactory.makePrismaQuestionComment({
        questionId: question.id,
        authorId: user.id,
        content: 'comment 02',
      })
    ])

    const response = await request(app.getHttpServer())
      .get(`/questions/${question.id.toString()}/comments`)
      .set({ Authorization: `Bearer ${access_token}` })
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body).toMatchObject({
      comments: [
        expect.objectContaining({
          content: 'comment 02',
        }),
        expect.objectContaining({
          content: 'comment 01',
        }),
      ],
    })
  })
})
