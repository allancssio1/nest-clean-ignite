import { AuthenticateStudentUseCase } from '@/domain/forum/application/useCases/authenticate-student'
import { CreateQuestionUseCase } from '@/domain/forum/application/useCases/create-question'
import { DeleteQuestionUseCase } from '@/domain/forum/application/useCases/delete-question'
import { EditQuestionUseCase } from '@/domain/forum/application/useCases/edit-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/useCases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/useCases/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/application/useCases/register-student'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/getQuestionBySlug.controller'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/application/useCases/answer-question'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditAnswerUseCase } from '@/domain/forum/application/useCases/edit-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/useCases/delete-answer'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/useCases/fetch-questions-answers'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { ChoosenQuestionBestAnswerUseCase } from '@/domain/forum/application/useCases/choose-question-best-answer'
import { CommentQuestionController } from './controllers/comment-on-question.controller'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/useCases/comment-on-question'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/useCases/delete-question-comment'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentQuestionController,
    DeleteQuestionCommentController
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChoosenQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase
  ],
})
export class HttpModule {}
