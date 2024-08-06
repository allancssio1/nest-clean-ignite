import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/useCases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/useCases/fetch-recent-questions'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/useCases/authenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/useCases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controllers/getQuestionBySlug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/useCases/get-question-by-slug'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
