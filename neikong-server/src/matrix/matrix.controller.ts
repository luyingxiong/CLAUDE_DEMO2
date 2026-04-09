import { Controller, Get, Param, NotFoundException } from '@nestjs/common'
import { PROCESS_GROUPS, RISK_ITEMS } from './matrix.data'

@Controller('api/matrix')
export class MatrixController {
  @Get('process/list')
  getProcessList() {
    return { code: 0, msg: 'success', data: { groups: PROCESS_GROUPS } }
  }

  @Get('process/:code/risks')
  getRiskList(@Param('code') code: string) {
    const allItems = PROCESS_GROUPS.flatMap((g) => g.items)
    const process = allItems.find((i) => i.code === code)
    if (!process) throw new NotFoundException({ code: 1001, msg: '流程编码不存在' })
    return {
      code: 0,
      msg: 'success',
      data: { processName: process.name, riskItems: RISK_ITEMS },
    }
  }
}
