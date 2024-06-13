import { test, expect, describe, beforeEach } from 'vitest'
import { NotificationsRepositoryInMemory } from '#/repositories/notifications-repository-in-memory'
import { SendNotificationUseCase } from './send-notification'

describe('Create Notification', () => {
  let notificationsRepository: NotificationsRepositoryInMemory
  let sut: SendNotificationUseCase

  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory()
    sut = new SendNotificationUseCase(notificationsRepository)
  })
  test('Should be able create an notification', async () => {
    const res = await sut.execute({
      recipientId: '1',
      title: 'new Notification',
      content: 'Nova resposta',
    })

    expect(res.isRight()).toBe(true)
    expect(res.isLeft()).toBe(false)
  })
})
