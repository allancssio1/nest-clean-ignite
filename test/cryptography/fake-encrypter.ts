import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    console.log('🚀 ~ FakeEncrypter ~ encrypt ~ payload:', payload)
    return JSON.stringify(payload)
  }
}
