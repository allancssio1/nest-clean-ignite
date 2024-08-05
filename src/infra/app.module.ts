import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envShcema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envShcema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
