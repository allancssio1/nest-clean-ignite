import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId('id-1'),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return notification
}
