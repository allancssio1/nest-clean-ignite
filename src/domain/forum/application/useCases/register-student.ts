import { Either, left, right } from '@/core/Either'
import { Student } from '../../enterprise/entities/Student'
import { StudentsRepsitory } from '../repositories/students-repository'
import { ConflictException, Injectable } from '@nestjs/common'
import { HasherGenerate } from '../cryptography/hasher-generate'
import { StudentAlreadyExistsError } from './errors/student-already-exists'

interface RegisterStudentUseCaseRequest {
  email: string
  name: string
  password: string
}
type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentRepository: StudentsRepsitory,
    private hashGenerate: HasherGenerate,
  ) {}

  async execute({
    email,
    name,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const userAlreadyExists = await this.studentRepository.findByEmail(email)

    if (userAlreadyExists) return left(new StudentAlreadyExistsError(email))

    const password_hash = await this.hashGenerate.hash(password)

    const student = Student.create({ email, name, password: password_hash })

    await this.studentRepository.create(student)

    return right({ student })
  }
}
