import { test, expect, describe, beforeEach } from 'vitest'
import { NotificationsRepositoryInMemory } from '#/repositories/notifications-repository-in-memory'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from '#/factories/make-notification'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'

describe('Create Notification', () => {
  let notificationsRepository: NotificationsRepositoryInMemory
  let sut: ReadNotificationUseCase
  let newNotification: Notification

  beforeEach(async () => {
    notificationsRepository = new NotificationsRepositoryInMemory()
    sut = new ReadNotificationUseCase(notificationsRepository)
    newNotification = makeNotification()

    await notificationsRepository.create(newNotification)
  })
  test('Should be able mark an notification with readed', async () => {
    const res = await sut.execute({
      recipientId: newNotification.recipientId.toString(),
      notificationId: newNotification.id.toString(),
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
    expect(notificationsRepository.items[0].readAt).toEqual(expect.any(Date))
  })
  test('Should be not able mark an notification with readed another recipientId', async () => {
    const res = await sut.execute({
      recipientId: 'recipient-wrong',
      notificationId: newNotification.id.toString(),
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
    expect(res.value).toBeInstanceOf(UnauthorazedError)
  })
})
