import { test, expect, describe, beforeEach } from 'vitest'
import { StudentsRepositoryInMemory } from '#/repositories/students-repository-in-memory'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { FakeHasher } from '#/cryptography/fake-hasher'
import { FakeEncrypter } from '#/cryptography/fake-encrypter'
import { Student } from '../../enterprise/entities/Student'
import { makeStudent } from '#/factories/make-student'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

describe('Authenticate Student', () => {
  let studentsRepository: StudentsRepositoryInMemory
  let sut: AuthenticateStudentUseCase
  let fakeHasher: FakeHasher
  let fakeEncrypt: FakeEncrypter
  let newStudent: Student

  beforeEach(async () => {
    studentsRepository = new StudentsRepositoryInMemory()
    fakeHasher = new FakeHasher()
    fakeEncrypt = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      studentsRepository,
      fakeHasher,
      fakeEncrypt,
    )

    newStudent = await makeStudent(
      { password: await fakeHasher.hash('123456') },
      new UniqueEntityId(),
    )

    studentsRepository.items.push(newStudent)
  })
  test('Should be able login with a student', async () => {
    const res = await sut.execute({
      email: newStudent.email,
      password: '123456',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(res.value).toEqual({
      access_token: expect.any(String),
    })
  })
})
