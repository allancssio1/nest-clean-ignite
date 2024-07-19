import { HashCompare } from '@/domain/forum/application/cryptography/hasher-compare'
import { HashGenerate } from '@/domain/forum/application/cryptography/hasher-generate'

export class FakeHasher implements HashGenerate, HashCompare {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
