import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/pisma.services'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Recent Questions (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'johndoe@example.com',
        password: '123456',
        name: 'John Doe',
      },
    })

    const access_token = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          authorId: user.id,
          content: 'contente 1',
          slug: 'question-1',
          title: 'Question 1',
        },
        {
          authorId: user.id,
          content: 'contente 2',
          slug: 'question-2',
          title: 'Question 2',
        },
        {
          authorId: user.id,
          content: 'contente 3',
          slug: 'question-3',
          title: 'Question 3',
        },
        {
          authorId: user.id,
          content: 'contente 4',
          slug: 'question-4',
          title: 'Question 4',
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set({ Authorization: `Bearer ${access_token}` })
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({
          title: 'Question 1',
        }),
        expect.objectContaining({
          title: 'Question 2',
        }),
        expect.objectContaining({
          title: 'Question 3',
        }),
        expect.objectContaining({
          title: 'Question 4',
        }),
      ],
    })
  })
})
