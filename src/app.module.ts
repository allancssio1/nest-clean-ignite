import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/pisma.services'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
