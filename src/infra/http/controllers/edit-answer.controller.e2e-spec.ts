import { AnswerFactory } from '#/factories/make-answer'
import { AnswerAttachmentFactory } from '#/factories/make-answer-attachment'
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

describe('Edit answer (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let attachmentsFactory: AttachmentFactory
  let answerAttachmentFactory: AnswerAttachmentFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        AnswerFactory,
        QuestionFactory,
        AttachmentFactory,
        PrismaService,
        AnswerAttachmentFactory,
      ],
    }).compile()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    attachmentsFactory = moduleRef.get(AttachmentFactory)
    answerAttachmentFactory = moduleRef.get(AnswerAttachmentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('[PUT] /answers/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const access_token = jwt.sign({ sub: user.id.toString() })
    const attachment1 = await attachmentsFactory.makePrismaAttachment()
    console.log('🚀 ~ test ~ attachment1:', attachment1.id.toString())
    const attachment2 = await attachmentsFactory.makePrismaAttachment()
    console.log('🚀 ~ test ~ attachment2:', attachment2.id.toString())

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })
    console.log('🚀 ~ test ~ answer.id:', answer.id)
    await answerAttachmentFactory.makePrismaAnswerAttachment({
      answerId: answer.id,
      attachmentId: attachment1.id,
    })
    await answerAttachmentFactory.makePrismaAnswerAttachment({
      answerId: answer.id,
      attachmentId: attachment2.id,
    })

    const attachment3 = await attachmentsFactory.makePrismaAttachment()
    console.log('🚀 ~ test ~ attachment3:', attachment3.id.toString())

    const response = await request(app.getHttpServer())
      .put(`/answers/${answer.id.toString()}`)
      .set({ Authorization: `Bearer ${access_token}` })
      .send({
        content: 'Content from new answer on tests',
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      })

    expect(response.statusCode).toBe(204)
    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        answerId: answer.id.toString(),
      },
    })
    console.log(
      '🚀 ~ test ~ attachmentOnDatabase:',
      attachmentOnDatabase.length,
    )

    expect(attachmentOnDatabase).toHaveLength(2)
    expect(attachmentOnDatabase).toEqual([
      expect.objectContaining({
        id: attachment1.id.toString(),
      }),
      expect.objectContaining({
        id: attachment3.id.toString(),
      }),
    ])
  })
})
