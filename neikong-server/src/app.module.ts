import { Module } from '@nestjs/common';
import { MatrixModule } from './matrix/matrix.module';

@Module({
  imports: [MatrixModule],
})
export class AppModule {}
