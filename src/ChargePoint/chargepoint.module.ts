import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargePointService } from './chargepoint.service';
import { ChargePointController } from './chargepoint.controller';
import { ChargePoint } from './entities/chargepoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChargePoint])],
  controllers: [ChargePointController],
  providers: [ChargePointService],
})

export class ChargePointModule {}
