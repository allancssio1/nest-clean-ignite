import { Either, left, right } from '@/core/Either'
import { StudentsRepsitory } from '../repositories/students-repository'
import { Injectable } from '@nestjs/common'
import { HashCompare } from '../cryptography/hasher-compare'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}
type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    access_token: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentRepository: StudentsRepsitory,
    private hashGenerate: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) return left(new WrongCredentialsError())

    const password_hash = await this.hashGenerate.compare(
      password,
      student.password,
    )

    if (!password_hash) return left(new WrongCredentialsError())

    const access_token = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })
    console.log('🚀 ~ AuthenticateStudentUseCase ~ access_token:', access_token)

    return right({ access_token })
  }
}
