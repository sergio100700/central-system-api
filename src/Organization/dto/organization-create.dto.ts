import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OrganizationCreateDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
    
    @IsString()
    @IsOptional()
    public readonly legalEntity: string;
}