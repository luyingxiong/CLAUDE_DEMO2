import { Module } from '@nestjs/common'
import { MatrixController } from './matrix.controller'

@Module({ controllers: [MatrixController] })
export class MatrixModule {}
