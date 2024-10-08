import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
/* Services */
import { RolesService } from './roles.service';
/* DTOs */
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
/* Decorators */
import { Auth } from '@modules/auth/decorators';
import { ValidateUUIDFormatPipe } from '@common/decorators/is-uuid-format.decorator';

@Controller('roles')
@Auth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateUUIDFormatPipe) id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ValidateUUIDFormatPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateUUIDFormatPipe) id: string) {
    return this.rolesService.remove(id);
  }
}
