import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/Question'

export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<Question>
  abstract delete(question: Question): Promise<void>
  abstract save(question: Question): Promise<void>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecents({ page }: PaginationParams): Promise<Question[] | []>
  abstract findById(id: string): Promise<Question | null>
}
