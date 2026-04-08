import { get } from './request'

/** 获取流程分组列表 */
export const fetchProcessList = () => get('/matrix/process/list')

/** 获取指定流程的风险列表 */
export const fetchRiskList = (code) => get(`/matrix/process/${code}/risks`)
