import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/pisma.services'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prisma = moduleRef.get(PrismaService)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[POST] /session', async () => {
    await prisma.user.create({
      data: {
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
        name: 'John Doe',
      },
    })

    const response = await request(app.getHttpServer()).post('/session').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
