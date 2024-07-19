import { UseCaseError } from '@/core/errors/use-case-error'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(indentifier?: string) {
    super(
      `Student "${indentifier ?? 'with same e-mail'}" address already exists.`,
    )
  }
}
