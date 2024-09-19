import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* Entities */
import { Role } from './entities/role.entity';
/* Services */
import { RolesService } from './roles.service';
/* Controllers */
import { RolesController } from './roles.controller';

@Module({
  controllers: [ RolesController ],
  providers  : [ RolesService ],
  imports    : [ TypeOrmModule.forFeature([ Role ]) ],
  exports    : [ TypeOrmModule ],
})
export class RolesModule {}
