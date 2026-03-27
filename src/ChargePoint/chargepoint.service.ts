import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChargePoint } from "./entities/chargepoint.entity";
import { CreateChargePointDto } from "./dto/chargepoint-create.dto";
import { UpdateChargePointDto } from "./dto/chargepoint-update.dto";
import { Organization } from "../Organization/entities/organization.entity";

@Injectable()
export class ChargePointService {
    constructor(@InjectRepository(ChargePoint) private readonly chargePointRepository: Repository<ChargePoint>) { }

    async findAll(): Promise<ChargePoint[]> {
        try {
            return await this.chargePointRepository.find({ relations: ['cpo'] });
        } catch {
            throw new InternalServerErrorException('Error fetching charge points');
        }
    }

    async findOne(id: string): Promise<ChargePoint> {
        try {
            const chargePoint = await this.chargePointRepository.findOne({ where: { id }, relations: ['cpo'] });
            if (!chargePoint) throw new NotFoundException(`ChargePoint with id ${id} not found`);
            return chargePoint;
        } catch (e) {
            if (e instanceof NotFoundException) throw e;
            throw new InternalServerErrorException('Error fetching charge point');
        }
    }

    async create(dto: CreateChargePointDto): Promise<ChargePoint> {
        try {
            const entity = this.chargePointRepository.create({
                identity: dto.identity,
                cpo: { id: dto.cpoId },
            });
            return await this.chargePointRepository.save(entity);
        } catch {
            throw new InternalServerErrorException('Error creating charge point');
        }
    }

    async update(id: string, dto: UpdateChargePointDto): Promise<ChargePoint> {
        try {
            const chargePoint = await this.findOne(id);
            if (dto.identity !== undefined) chargePoint.identity = dto.identity;
            if (dto.cpoId !== undefined) chargePoint.cpo = { id: dto.cpoId } as Organization;
            return await this.chargePointRepository.save(chargePoint);
        } catch (e) {
            if (e instanceof NotFoundException) throw e;
            throw new InternalServerErrorException('Error updating charge point');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            const result = await this.chargePointRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException(`ChargePoint with id ${id} not found`);
        } catch (e) {
            if (e instanceof NotFoundException) throw e;
            throw new InternalServerErrorException('Error deleting charge point');
        }
    }
}
