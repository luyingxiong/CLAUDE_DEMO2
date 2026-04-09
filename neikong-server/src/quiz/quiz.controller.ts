import { Controller, Get } from '@nestjs/common'
import { TODAY_QUESTION } from './quiz.data'

@Controller('api/quiz')
export class QuizController {
  @Get('today')
  getTodayQuestion() {
    return { code: 0, msg: 'success', data: TODAY_QUESTION }
  }
}
