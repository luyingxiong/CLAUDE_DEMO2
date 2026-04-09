import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common'
import { PROCESS_GROUPS, RISK_COLUMNS, RISK_ITEMS } from './matrix.data'

@Controller('api/matrix')
export class MatrixController {
  @Get('process/list')
  getProcessList() {
    return { code: 0, msg: 'success', data: { groups: PROCESS_GROUPS } }
  }

  @Get('process/:code/risks')
  getRiskList(
    @Param('code') code: string,
    @Query('pageNum') pageNum = '1',
    @Query('pageSize') pageSize = '10',
  ) {
    const allItems = PROCESS_GROUPS.flatMap((g) => g.items)
    const process = allItems.find((i) => i.code === code)
    if (!process) throw new NotFoundException({ code: 1001, msg: '流程编码不存在' })

    const page = Math.max(1, parseInt(pageNum, 10))
    const size = Math.max(1, parseInt(pageSize, 10))
    const total = RISK_ITEMS.length
    const riskItems = RISK_ITEMS.slice((page - 1) * size, page * size)

    return {
      code: 0,
      msg: 'success',
      data: {
        processName: process.name,
        columns: RISK_COLUMNS,
        total,
        pageNum: page,
        pageSize: size,
        riskItems,
      },
    }
  }
}
