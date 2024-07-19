import { test, expect, describe, beforeEach } from 'vitest'
import { CreateQuestionUseCase } from '@/domain/forum/application/useCases/create-question'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'

describe('Create Question', () => {
  let questionsRepository: QuestionsRepositoryInMemory
  let questionAttachmentsRepository: QuestionAttachmentsRepositoryInMemory
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    questionAttachmentsRepository = new QuestionAttachmentsRepositoryInMemory()
    questionsRepository = new QuestionsRepositoryInMemory(
      questionAttachmentsRepository,
    )
    sut = new CreateQuestionUseCase(questionsRepository)
  })
  test('Should be able create an question', async () => {
    const res = await sut.execute({
      authorId: '1',
      title: 'new Question',
      content: 'Nova resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(questionsRepository.items[0].attachments.currentItems).toHaveLength(
      2,
    )
    expect(questionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
