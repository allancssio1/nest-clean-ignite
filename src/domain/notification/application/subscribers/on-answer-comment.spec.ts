import { makeAnswer } from '#/factories/make-answer'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { AnswerAttachmentsRepositoryInMemory } from '#/repositories/answers-attachments-repository-in-memory'

import { NotificationsRepositoryInMemory } from '#/repositories/notifications-repository-in-memory'
import { MockInstance } from 'vitest'
import { waitFor } from '#/utils/wait-for'
import { AnswerCommentsRepositoryInMemory } from '#/repositories/answer-comments-repository-in-memory'
import { makeAnswerComment } from '#/factories/make-answer-comment'
import { OnAnswerComment } from './on-answer-comment'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../useCases/send-notification'

let answerCommentsRepositoryInMemory: AnswerCommentsRepositoryInMemory
let answersRepositoryInMemory: AnswersRepositoryInMemory
let answerAttachmentsRepositoryInMemory: AnswerAttachmentsRepositoryInMemory
let notificationsRepositoryInMemory: NotificationsRepositoryInMemory
let senNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Comment Created', () => {
  beforeEach(() => {
    answerAttachmentsRepositoryInMemory =
      new AnswerAttachmentsRepositoryInMemory()
    answersRepositoryInMemory = new AnswersRepositoryInMemory(
      answerAttachmentsRepositoryInMemory,
    )

    answerCommentsRepositoryInMemory = new AnswerCommentsRepositoryInMemory()

    notificationsRepositoryInMemory = new NotificationsRepositoryInMemory()
    senNotificationUseCase = new SendNotificationUseCase(
      notificationsRepositoryInMemory,
    )

    sendNotificationExecuteSpy = vi.spyOn(senNotificationUseCase, 'execute')

    // eslint-disable-next-line no-new
    new OnAnswerComment(answersRepositoryInMemory, senNotificationUseCase)
  })
  it('should send a notification when answer comment has created ', async () => {
    const answer = makeAnswer()
    const answerComment = makeAnswerComment({
      answerId: answer.id,
    })

    await answersRepositoryInMemory.create(answer)
    await answerCommentsRepositoryInMemory.create(answerComment)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
