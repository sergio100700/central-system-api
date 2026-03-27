import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateChargePointDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly identity?: string;

    @IsOptional()
    @IsUUID()
    public readonly cpoId?: string;
}
