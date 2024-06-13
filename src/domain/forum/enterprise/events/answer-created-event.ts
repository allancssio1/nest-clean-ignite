import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { DomainEvent } from '@/core/events/domain-event'
import { Answer } from '../entities/Answer'

export class AnswerCreatedEvent implements DomainEvent {
  ocurredAt: Date
  answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
