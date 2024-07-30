import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { Student } from '@/domain/forum/enterprise/entities/Student'

export class StudentsRepositoryInMemory implements StudentsRepository {
  constructor() {}

  items: Student[] = []

  async create(student: Student) {
    await this.items.push(student)
    // DomainEvents.dispatchEventsForAggregate(student.id)

    return student
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.items.find((item) => item.email === email)

    return student ?? null
  }
}
