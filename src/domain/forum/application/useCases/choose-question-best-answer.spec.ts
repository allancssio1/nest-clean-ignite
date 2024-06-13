import { test, expect, describe, beforeEach } from 'vitest'
import { AnswersRepositoryInMemory } from '#/repositories/answers-repository-in-memory'
import { ChosenQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { QuestionsRepositoryInMemory } from '#/repositories/questions-repository-in-memory'
import { makeQuestion } from '#/factories/make-question'
import { makeAnswer } from '#/factories/make-answer'
import { QuestionAttachmentsRepositoryInMemory } from '#/repositories/questions-attachments-repository-in-memory'
import { AnswerAttachmentsRepositoryInMemory } from '#/repositories/answers-attachments-repository-in-memory'
import { Question } from '../../enterprise/entities/Question'
import { Answer } from '../../enterprise/entities/Answer'

describe('Chosen Question Best Answer', () => {
  let answersRepository: AnswersRepositoryInMemory
  let questionAttachmentRepository: QuestionAttachmentsRepositoryInMemory
  let answerAttachmentRepository: AnswerAttachmentsRepositoryInMemory
  let questionRepository: QuestionsRepositoryInMemory
  let sut: ChosenQuestionBestAnswerUseCase
  let question: Question
  let answer: Answer

  beforeEach(() => {
    questionAttachmentRepository = new QuestionAttachmentsRepositoryInMemory()
    answerAttachmentRepository = new AnswerAttachmentsRepositoryInMemory()
    answersRepository = new AnswersRepositoryInMemory(
      answerAttachmentRepository,
    )
    questionRepository = new QuestionsRepositoryInMemory(
      questionAttachmentRepository,
    )
    sut = new ChosenQuestionBestAnswerUseCase(
      answersRepository,
      questionRepository,
    )
    question = makeQuestion()
    questionRepository.create(question)
    answer = makeAnswer({ questionId: question.id })
    answersRepository.create(answer)
  })
  test('Should be able mark an answer with best', async () => {
    const response = await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })
    expect(response.isRight()).toBe(true)
    expect(response.isLeft()).toBe(false)
  })

  test('Should net be able mark an answer with best of another author', async () => {
    const res = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
  })
})
