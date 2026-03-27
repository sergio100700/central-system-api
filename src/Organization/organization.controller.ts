import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Organization } from './entities/organization.entity';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/organization-create.dto';
import { UpdateOrganizationDto } from './dto/organization-update.dto';

@Controller('organizations')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) { }

    @Get()
    getOrganizations(): Promise<Organization[]> {
        return this.organizationService.findAll();
    }

    @Get(':id')
    getOrganization(@Param('id') id: string): Promise<Organization> {
        return this.organizationService.findOne(id);
    }

    @Post()
    createOrganization(@Body() organization: CreateOrganizationDto): Promise<Organization> {
        return this.organizationService.create(organization);
    }

    @Patch(':id')
    updateOrganization(@Param('id') id: string, @Body() organization: UpdateOrganizationDto): Promise<Organization> {
        return this.organizationService.update(id, organization);
    }

    @Delete(':id')
    deleteOrganization(@Param('id') id: string): Promise<void> {
        return this.organizationService.remove(id);
    }
}
