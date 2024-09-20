import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
/* Services */  
import { RolePermissionsService } from './role-permissions.service';
/* DTOs */
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
/* Decorators */
import { ValidateUUIDFormatPipe } from '@common/decorators/is-uuid-format.decorator';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @Post()
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionsService.create(createRolePermissionDto);
  }

  @Get()
  findAll() {
    return this.rolePermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateUUIDFormatPipe) id: string) {
    return this.rolePermissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ValidateUUIDFormatPipe) id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto) {
    return this.rolePermissionsService.update(id, updateRolePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateUUIDFormatPipe) id: string) {
    return this.rolePermissionsService.remove(id);
  }
}
