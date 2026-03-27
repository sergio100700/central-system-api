import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateChargePointDto {
    @IsString()
    @IsNotEmpty()
    public readonly identity: string;

    @IsUUID()
    @IsNotEmpty()
    public readonly cpoId: string;
}
