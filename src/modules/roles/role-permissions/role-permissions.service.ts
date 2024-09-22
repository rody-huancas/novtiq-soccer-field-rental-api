import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* Libraries */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/* DTOs */
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
/* Entities */
import { Menu } from '@modules/menu/entities/menu.entity';
import { Permission } from '@modules/roles/permissions/entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
/* Utils */
import { validateExistence } from '@utils/validateExistence';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionsRepository: Repository<RolePermission>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createRolePermissionDto: CreateRolePermissionDto) {
    try {
      const { rp_permission_id, rp_menu_id, ...data } = createRolePermissionDto;

      await validateExistence(this.permissionRepository, rp_permission_id, 'pe_id', 'permiso');
      await validateExistence(this.menuRepository, rp_menu_id, 'me_id', 'menú');

      const rolePermission = this.rolePermissionsRepository.create({ ...data, rp_permission_id, rp_menu_id });
      
      await this.rolePermissionsRepository.save(rolePermission);
      
      return rolePermission;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const rolePermissions = await this.rolePermissionsRepository.find();
      return rolePermissions;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const rolePermission = await validateExistence(this.rolePermissionsRepository, id, 'rp_id', 'Permiso de rol');

      return rolePermission;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateRolePermissionDto: UpdateRolePermissionDto) {
    try {
      await validateExistence(this.rolePermissionsRepository, id, 'rp_id', 'Permiso de rol');
      
      const { rp_permission_id, rp_menu_id, ...data } = updateRolePermissionDto;

      await validateExistence(this.permissionRepository, rp_permission_id, 'pe_id', 'permiso');
      await validateExistence(this.menuRepository, rp_menu_id, 'me_id', 'menú');
      
      const updatedRolePermission = await this.rolePermissionsRepository.update(id, { 
        ...data, 
        rp_permission_id, 
        rp_menu_id 
      });
      
      return updatedRolePermission;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      await this.rolePermissionsRepository.delete(id);
      return { message: 'Permiso de rol eliminado correctamente.' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
