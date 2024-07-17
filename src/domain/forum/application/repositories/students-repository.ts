import { PaginationParams } from '@/core/repositories/pagination-params'
import { Student } from '../../enterprise/entities/Student'

export abstract class QuestionsRepsitory {
  abstract create(question: Student): Promise<Student>
  abstract findByEmail(email: string): Promise<Student | null>
  // abstract delete(question: Student): Promise<void>
  // abstract save(question: Student): Promise<void>
  // abstract findBySlug(slug: string): Promise<Student | null>
  // abstract findManyRecents({ page }: PaginationParams): Promise<Student[] | []>
}
