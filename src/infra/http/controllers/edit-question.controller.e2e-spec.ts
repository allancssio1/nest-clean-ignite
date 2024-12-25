import { AttachmentFactory } from '#/factories/make-attachment'
import { QuestionFactory } from '#/factories/make-question'
import { QuestionAttachmentFactory } from '#/factories/make-question-attachment'
import { StudentFactory } from '#/factories/make-student'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/pisma.services'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Edit question (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let attachmentsFactory: AttachmentFactory
  let questinAttachmentsFactory: QuestionAttachmentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
        PrismaService,
      ],
    }).compile()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentsFactory = moduleRef.get(AttachmentFactory)
    questinAttachmentsFactory = moduleRef.get(QuestionAttachmentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[PUT] /questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const attachment1 = await attachmentsFactory.makePrismaAttachment()
    const attachment2 = await attachmentsFactory.makePrismaAttachment()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    await questinAttachmentsFactory.makePrismaQuestionAttachment({
      attachmentId: attachment1.id,
      questionId: question.id,
    })
    await questinAttachmentsFactory.makePrismaQuestionAttachment({
      attachmentId: attachment2.id,
      questionId: question.id,
    })

    const attachment3 = await attachmentsFactory.makePrismaAttachment()
    const attachment4 = await attachmentsFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .put(`/questions/${question.id.toString()}`)
      .set({ Authorization: `Bearer ${access_token}` })
      .send({
        title: 'New Question',
        content: 'Content from new question on tests',
        attachments: [
          attachment1.id.toString(),
          attachment3.id.toString(),
          attachment4.id.toString(),
        ],
      })

    expect(response.statusCode).toBe(204)

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: question.id.toString(),
      },
    })

    expect(attachmentOnDatabase).toHaveLength(3)
    expect(attachmentOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: attachment1.id.toString(),
        }),
        expect.objectContaining({
          id: attachment3.id.toString(),
        }),
      ]),
    )
  })
})
