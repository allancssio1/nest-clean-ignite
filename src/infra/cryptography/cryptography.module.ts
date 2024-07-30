import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashCompare } from '@/domain/forum/application/cryptography/hasher-compare'
import { HashGenerate } from '@/domain/forum/application/cryptography/hasher-generate'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashCompare, useClass: BcryptHasher },
    { provide: HashGenerate, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashCompare, HashGenerate],
})
export class CryptographyModule {}
