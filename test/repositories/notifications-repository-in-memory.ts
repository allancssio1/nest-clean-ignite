import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notirications-repository'

export class NotificationsRepositoryInMemory
  implements NotificationsRepository
{
  items: Notification[] = []

  async create(notification: Notification) {
    await this.items.push(notification)
  }

  async findById(notificationId: string) {
    const question = await this.items.find(
      (item) => item.id.toValue() === notificationId,
    )
    return question ?? null
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }
}
