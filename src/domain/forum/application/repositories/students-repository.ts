import { Student } from '../../enterprise/entities/Student'

export abstract class StudentsRepository {
  abstract create(student: Student): Promise<Student>
  abstract findByEmail(email: string): Promise<Student | null>
  // abstract delete(student: Student): Promise<void>
  // abstract save(student: Student): Promise<void>
  // abstract findBySlug(slug: string): Promise<Student | null>
  // abstract findManyRecents({ page }: PaginationParams): Promise<Student[] | []>
}
