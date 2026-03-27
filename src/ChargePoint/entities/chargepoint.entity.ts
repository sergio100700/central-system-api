import { Organization } from "../../Organization/entities/organization.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChargePoint {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    identity: string;

    @ManyToOne(() => Organization, { nullable: false })
    cpo: Organization;
}