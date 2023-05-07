import { Module } from '@nestjs/common';
import { PoliticalService } from './political.service';
import { PoliticalController } from './political.controller';

@Module({
  controllers: [PoliticalController],
  providers: [PoliticalService]
})
export class PoliticalModule {}
