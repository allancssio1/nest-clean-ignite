import { Either, right } from '@/core/Either'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { NotificationsRepository } from '../repositories/notirications-repository'
import { Notification } from '../../enterprise/entities/notification'

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}
export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    content,
    title,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    this.notificationRepository.create(notification)

    return right({ notification })
  }
}
