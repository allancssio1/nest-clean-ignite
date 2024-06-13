import { makeQuestion } from '#/factories/make-question'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'

import { NotificationsRepositoryInMemory } from '#/repositories/notifications-repository-in-memory'
import { MockInstance } from 'vitest'
import { waitFor } from '#/utils/wait-for'
import { QuestionCommentsRepositoryInMemory } from '#/repositories/questions-comments-repository-in-memory'
import { makeQuestionComment } from '#/factories/make-question-comment'
import { OnQuestionComment } from './on-question-comment'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../useCases/send-notification'

let questionCommentsRepositoryInMemory: QuestionCommentsRepositoryInMemory
let questionsRepositoryInMemory: QuestionsRepositoryInMemory
let questionAttachmentsRepositoryInMemory: QuestionAttachmentsRepositoryInMemory
let notificationsRepositoryInMemory: NotificationsRepositoryInMemory
let senNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Question Comment Created', () => {
  beforeEach(() => {
    questionAttachmentsRepositoryInMemory =
      new QuestionAttachmentsRepositoryInMemory()
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory(
      questionAttachmentsRepositoryInMemory,
    )

    questionCommentsRepositoryInMemory =
      new QuestionCommentsRepositoryInMemory()

    notificationsRepositoryInMemory = new NotificationsRepositoryInMemory()
    senNotificationUseCase = new SendNotificationUseCase(
      notificationsRepositoryInMemory,
    )

    sendNotificationExecuteSpy = vi.spyOn(senNotificationUseCase, 'execute')

    // eslint-disable-next-line no-new
    new OnQuestionComment(questionsRepositoryInMemory, senNotificationUseCase)
  })
  it('should send a notification when question comment has created ', async () => {
    const question = makeQuestion()
    const questionComment = makeQuestionComment({
      questionId: question.id,
    })

    await questionsRepositoryInMemory.create(question)
    await questionCommentsRepositoryInMemory.create(questionComment)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
