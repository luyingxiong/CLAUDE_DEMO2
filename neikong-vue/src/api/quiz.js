import { get } from './request'

/** 获取今日一题 */
export const fetchTodayQuestion = () => get('/quiz/today')
