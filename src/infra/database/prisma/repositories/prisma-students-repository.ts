import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/Student'
import { PrismaService } from '../pisma.services'
import { Injectable } from '@nestjs/common'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(student: Student): Promise<Student> {
    const data = PrismaStudentMapper.toPrisma(student)
    const newStudent = await this.prisma.user.create({
      data,
    })
    return PrismaStudentMapper.toDomain(newStudent)
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({ where: { email } })

    return student ? PrismaStudentMapper.toDomain(student) : null
  }
}
