import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/Question'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId('id-1'),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
