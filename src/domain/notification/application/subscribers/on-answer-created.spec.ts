import { OnAnswerCreated } from './on-answer-created'
import { makeAnswer } from '#/factories/make-answer'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { AnswerAttachmentsRepositoryInMemory } from '#/repositories/answers-attachments-repository-in-memory'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'

import { NotificationsRepositoryInMemory } from '#/repositories/notifications-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { MockInstance } from 'vitest'
import { waitFor } from '#/utils/wait-for'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../useCases/send-notification'

let questionAttachmentsRepositoryInMemory: QuestionAttachmentsRepositoryInMemory
let questionsRepositoryInMemory: QuestionsRepositoryInMemory
let answersRepositoryInMemory: AnswersRepositoryInMemory
let answerAttachmentsRepositoryInMemory: AnswerAttachmentsRepositoryInMemory
let notificationsRepositoryInMemory: NotificationsRepositoryInMemory
let senNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    questionAttachmentsRepositoryInMemory =
      new QuestionAttachmentsRepositoryInMemory()
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory(
      questionAttachmentsRepositoryInMemory,
    )

    answerAttachmentsRepositoryInMemory =
      new AnswerAttachmentsRepositoryInMemory()
    answersRepositoryInMemory = new AnswersRepositoryInMemory(
      answerAttachmentsRepositoryInMemory,
    )

    notificationsRepositoryInMemory = new NotificationsRepositoryInMemory()
    senNotificationUseCase = new SendNotificationUseCase(
      notificationsRepositoryInMemory,
    )

    sendNotificationExecuteSpy = vi.spyOn(senNotificationUseCase, 'execute')

    // eslint-disable-next-line no-new
    new OnAnswerCreated(questionsRepositoryInMemory, senNotificationUseCase)
  })
  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await questionsRepositoryInMemory.create(question)
    await answersRepositoryInMemory.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
