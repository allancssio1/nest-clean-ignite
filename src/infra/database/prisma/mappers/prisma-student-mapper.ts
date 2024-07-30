import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Student } from '@/domain/forum/enterprise/entities/Student'
import { Prisma, User as PrismaStudent } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaStudent): Student {
    const { email, id, name, password, role } = raw
    return Student.create(
      {
        email,
        name,
        password,
      },
      new UniqueEntityId(id),
    )
  }

  static toPrisma(raw: Student): Prisma.UserUncheckedCreateInput {
    const { id, email, name, password } = raw
    return {
      id: id.toString(),
      name,
      email,
      password,
    }
  }
}
