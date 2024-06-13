import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { DomainEvent } from '@/core/events/domain-event'
import { Question } from '../entities/Question'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  ocurredAt: Date
  question: Question
  bestAnswerId: UniqueEntityId

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id
  }
}
