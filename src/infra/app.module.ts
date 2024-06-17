import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/pisma.services'
import { ConfigModule } from '@nestjs/config'
import { envShcema } from './env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envShcema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
