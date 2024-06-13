import { Either, left, right } from '@/core/Either'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { NotificationsRepository } from '../repositories/notirications-repository'
import { Notification } from '../../enterprise/entities/notification'

interface ReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}
type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) return left(new ResourceNotFoundError())

    if (notification.recipientId.toString() !== recipientId)
      return left(new UnauthorazedError())

    notification.read()
    this.notificationRepository.save(notification)

    return right({ notification })
  }
}
