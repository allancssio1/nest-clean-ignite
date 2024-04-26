import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  /**
   * type ConfigService <type, validate? true or false>
   * this case is true because is validate in zod-validation-pipe.ts
   */
  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()
