import { HashCompare } from '@/domain/forum/application/cryptography/hasher-compare'
import { HashGenerate } from '@/domain/forum/application/cryptography/hasher-generate'
import { hash, compare as compareBcryptjs } from 'bcryptjs'

export class BcryptHasher implements HashGenerate, HashCompare {
  async hash(plain: string): Promise<string> {
    return await hash(plain, 8)
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return await compareBcryptjs(plain, hash)
  }
}
