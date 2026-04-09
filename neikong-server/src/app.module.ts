import { Module } from '@nestjs/common'
import { MatrixModule } from './matrix/matrix.module'
import { QuizModule } from './quiz/quiz.module'

@Module({
  imports: [MatrixModule, QuizModule],
})
export class AppModule {}
