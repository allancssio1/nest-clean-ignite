import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { AnswerCommentCreatedEvent } from '@/domain/forum/enterprise/events/answer-comment-created-event'
import { SendNotificationUseCase } from '../useCases/send-notification'

export class OnAnswerComment implements EventHandler {
  constructor(
    private answersRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendAnswerCommentNotification.bind(this),
      AnswerCommentCreatedEvent.name,
    )
  }

  private async sendAnswerCommentNotification({
    answerComment,
  }: AnswerCommentCreatedEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    )
    if (answer)
      await this.sendNotification.execute({
        content: `${answerComment.content.substring(0, 40).concat('...')}`,
        recipientId: answer.id.toString(),
        title: `Alguém comentou sua resposta`,
      })
  }
}
