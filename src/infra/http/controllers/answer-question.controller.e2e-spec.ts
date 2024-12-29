import { AttachmentFactory } from '#/factories/make-attachment'
import { QuestionFactory } from '#/factories/make-question'
import { StudentFactory } from '#/factories/make-student'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/pisma.services'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create answer a question (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        PrismaService,
      ],
    }).compile()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    prisma = moduleRef.get(PrismaService)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    jwt = moduleRef.get(JwtService)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[POST] /questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent()

    const access_token = jwt.sign({ sub: user.id.toString() })
    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const response = await request(app.getHttpServer())
      .post(`/questions/${question.id}/answers`)
      .set({ Authorization: `Bearer ${access_token}` })
      .send({
        content: 'Conteúdo da resposta',
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })

    expect(response.statusCode).toBe(201)
    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        answerId: response.body.id,
      },
    })
    expect(attachmentOnDatabase).toHaveLength(2)
  })
})
