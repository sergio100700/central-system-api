import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateOrganizationDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly name?: string;

    @IsOptional()
    @IsString()
    public readonly legalEntity?: string;
}
