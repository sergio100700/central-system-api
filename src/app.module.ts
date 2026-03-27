import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from './Organization/organization.module';
import { ChargePointModule } from './ChargePoint/chargepoint.module';


@Module({
  imports: [
    OrganizationModule,
    ChargePointModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST||'localhost',
      port: 3306,
      username: process.env.DB_USER||"user",
      password: process.env.DB_PASS||"pass",
      database: process.env.DB_NAME||"db",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
