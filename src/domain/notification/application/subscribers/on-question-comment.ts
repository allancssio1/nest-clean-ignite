import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepsitory } from '@/domain/forum/application/repositories/questions-repository'
import { QuestionCommentCreatedEvent } from '@/domain/forum/enterprise/events/question-comment-created-event'
import { SendNotificationUseCase } from '../useCases/send-notification'

export class OnQuestionComment implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepsitory,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionCommentNotification.bind(this),
      QuestionCommentCreatedEvent.name,
    )
  }

  private async sendQuestionCommentNotification({
    questionComment,
  }: QuestionCommentCreatedEvent) {
    const question = await this.questionsRepository.findById(
      questionComment.questionId.toString(),
    )
    if (question)
      await this.sendNotification.execute({
        content: `${questionComment.content.substring(0, 40).concat('...')}`,
        recipientId: question.id.toString(),
        title: `Alguém comentou sua pergunta`,
      })
  }
}
