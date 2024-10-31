import { test, expect, describe, beforeEach } from 'vitest'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'
import { AttachmentsRepositoryInMemory } from '#/repositories/attachments-repository-in-memory'
import { FakeUploader } from '#/storage/faker-uploader'
import { InvalidAttachmentType } from './errors/invalid-attachment-type'

describe('Upload and create attachment', () => {
  let attachmentsRepository: AttachmentsRepositoryInMemory
  let fakeUploader: FakeUploader
  let sut: UploadAndCreateAttachmentUseCase

  beforeEach(() => {
    attachmentsRepository = new AttachmentsRepositoryInMemory()
    fakeUploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentUseCase(attachmentsRepository, fakeUploader)
  })
  test('Should be able to upload and create an attachment', async () => {
    const res = await sut.execute({
      fileType: 'image/png',
      fileName: 'test.png',
      body: Buffer.from('test'),
    })

    expect(res.isRight()).toBe(true)
    expect(res.value).toEqual({
      attachment: attachmentsRepository.items[0],
    })
    expect(res.isLeft()).toBe(false)
    expect(fakeUploader.uploads).toHaveLength(1)  
    expect(fakeUploader.uploads[0]).toEqual(expect.objectContaining({
      fileName: 'test.png',
    }))
  })

  test('Should not be able to upload and create an attachment', async () => {
    const res = await sut.execute({
      fileType: 'image/txt',
      fileName: 'test.txt',
      body: Buffer.from('test'),
    })

    expect(res.isRight()).toBe(false)
    expect(res.isLeft()).toBe(true)
    expect(res.value).toBeInstanceOf(InvalidAttachmentType)
  })
})
