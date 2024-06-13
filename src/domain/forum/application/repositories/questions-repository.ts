import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/Question'

export interface QuestionsRepsitory {
  create(question: Question): Promise<Question>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecents({ page }: PaginationParams): Promise<Question[] | []>
  findById(id: string): Promise<Question | null>
}
