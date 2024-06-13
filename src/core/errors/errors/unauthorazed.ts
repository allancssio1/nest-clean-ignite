import { UseCaseError } from '@/core/errors/use-case-error'

export class UnauthorazedError extends Error implements UseCaseError {
  constructor() {
    super('Unauthorazed')
  }
}
