import { test, expect, describe, beforeEach } from 'vitest'
import { StudentsRepositoryInMemory } from '#/repositories/students-repository-in-memory'
import { RegisterStudentUseCase } from './register-student'
import { FakeHasher } from '#/cryptography/fake-hasher'

describe('Register Student', () => {
  let studentsRepository: StudentsRepositoryInMemory
  let sut: RegisterStudentUseCase
  let fakeHasher: FakeHasher

  beforeEach(() => {
    studentsRepository = new StudentsRepositoryInMemory()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(studentsRepository, fakeHasher)
  })
  test('Should be able create an student', async () => {
    const res = await sut.execute({
      name: 'teste name',
      email: 'test@test.com',
      password: '123456',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
  })
})
