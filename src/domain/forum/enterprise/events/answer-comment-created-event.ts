import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { DomainEvent } from '@/core/events/domain-event'
import { AnswerComment } from '../entities/AnswerComment'

export class AnswerCommentCreatedEvent implements DomainEvent {
  ocurredAt: Date
  answerComment: AnswerComment

  constructor(answerComment: AnswerComment) {
    this.answerComment = answerComment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answerComment.id
  }
}
