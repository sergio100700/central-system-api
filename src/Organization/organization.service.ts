import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/organization-create.dto';
import { UpdateOrganizationDto } from './dto/organization-update.dto';

@Injectable()
export class OrganizationService {

  constructor(@InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>) { }

  async create(organization: CreateOrganizationDto): Promise<Organization> {
    try {
      return await this.organizationRepository.save(organization);
    } catch {
      throw new InternalServerErrorException('Error creating organization');
    }
  }

  async findAll(): Promise<Organization[]> {
    try {
      return await this.organizationRepository.find();
    } catch {
      throw new InternalServerErrorException('Error fetching organizations');
    }
  }

  async findOne(id: string): Promise<Organization> {
    try {
      const organization = await this.organizationRepository.findOneBy({ id });
      if (!organization) throw new NotFoundException(`Organization with id ${id} not found`);
      return organization;
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException('Error fetching organization');
    }
  }

  async update(id: string, organization: UpdateOrganizationDto): Promise<Organization> {
    try {
      await this.organizationRepository.update(id, organization);
      return await this.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException('Error updating organization');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.organizationRepository.delete(id);
      if (result.affected === 0) throw new NotFoundException(`Organization with id ${id} not found`);
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException('Error deleting organization');
    }
  }
}
