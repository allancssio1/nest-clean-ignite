import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/pisma.services'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envShcema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envShcema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
