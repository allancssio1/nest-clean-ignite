import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/prisma/pisma.services'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create question (E2E)', () => {
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

  test('[POST] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'johndoe@example.com',
        password: '123456',
        name: 'John Doe',
      },
    })

    const access_token = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set({ Authorization: `Bearer ${access_token}` })
      .send({
        title: 'New Question',
        content: 'Content from new question on tests',
      })

    expect(response.statusCode).toBe(201)

    const querstinOnDatabase = await prisma.question.findMany({
      where: {
        authorId: user.id,
      },
    })

    expect(querstinOnDatabase).toHaveLength(1)
  })
})
