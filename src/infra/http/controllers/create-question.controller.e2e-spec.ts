import { StudentFactory } from '#/factories/make-student'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create question (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    studentFactory = moduleRef.get(StudentFactory)
    jwt = moduleRef.get(JwtService)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[POST] /questions', async () => {
    const user = await studentFactory.makePrismaStudent()

    const access_token = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set({ Authorization: `Bearer ${access_token}` })
      .send({
        title: 'New Question',
        content: 'Content from new question on tests',
      })

    expect(response.statusCode).toBe(201)
  })
})
