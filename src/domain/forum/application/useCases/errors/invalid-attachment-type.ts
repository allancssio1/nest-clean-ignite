import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidAttachmentType extends Error implements UseCaseError {
  constructor(indentifier?: string) {
    super(
      `Attachment "${indentifier}" is not valid.`,
    )
  }
}
