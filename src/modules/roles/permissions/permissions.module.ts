import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* Entities */
import { Permission } from './entities/permission.entity';
/* Services */
import { PermissionsService } from './permissions.service';
/* Controllers */
import { PermissionsController } from './permissions.controller';

@Module({
  controllers: [ PermissionsController ],
  providers  : [ PermissionsService ],
  imports    : [ TypeOrmModule.forFeature([ Permission ]) ],
  exports    : [ TypeOrmModule ],
})
export class PermissionsModule {}
