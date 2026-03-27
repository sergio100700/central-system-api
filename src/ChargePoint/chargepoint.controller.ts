import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ChargePointService } from "./chargepoint.service";
import { ChargePoint } from "./entities/chargepoint.entity";
import { CreateChargePointDto } from "./dto/chargepoint-create.dto";
import { UpdateChargePointDto } from "./dto/chargepoint-update.dto";

@Controller('chargepoints')
export class ChargePointController {
    constructor(private readonly chargePointService: ChargePointService) { }

    @Get()
    getChargePoints(): Promise<ChargePoint[]> {
        return this.chargePointService.findAll();
    }

    @Get(':id')
    getChargePoint(@Param('id') id: string): Promise<ChargePoint> {
        return this.chargePointService.findOne(id);
    }

    @Post()
    createChargePoint(@Body() chargePoint: CreateChargePointDto): Promise<ChargePoint> {
        return this.chargePointService.create(chargePoint);
    }

    @Patch(':id')
    updateChargePoint(@Param('id') id: string, @Body() chargePoint: UpdateChargePointDto): Promise<ChargePoint> {
        return this.chargePointService.update(id, chargePoint);
    }

    @Delete(':id')
    deleteChargePoint(@Param('id') id: string): Promise<void> {
        return this.chargePointService.remove(id);
    }
}