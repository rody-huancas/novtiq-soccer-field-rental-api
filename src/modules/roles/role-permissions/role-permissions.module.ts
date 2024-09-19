import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* Entities */
import { RolePermission } from './entities/role-permission.entity';
/* Services */
import { RolePermissionsService } from './role-permissions.service';
/* Controllers */
import { RolePermissionsController } from './role-permissions.controller';
/* Modules */
import { MenuModule } from '@modules/menu/menu.module';
import { PermissionsModule } from '@modules/roles/permissions/permissions.module';

@Module({
  controllers: [ RolePermissionsController ],
  providers  : [ RolePermissionsService ],
  imports    : [
    TypeOrmModule.forFeature([ RolePermission ]),
    PermissionsModule,
    MenuModule,
  ],
  exports: [ TypeOrmModule ],
})
export class RolePermissionsModule {}
