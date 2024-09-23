import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    @InjectRepository(RolePermission) private readonly rolePermissionsRepository: Repository<RolePermission>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    private dataSource: DataSource
  ) {}

  async create(createRolePermissionDto: CreateRolePermissionDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { rp_permission_id, rp_menu_id, ...data } = createRolePermissionDto;

      await validateExistence(this.permissionRepository, rp_permission_id, 'pe_id', 'permiso');
      await validateExistence(this.menuRepository, rp_menu_id, 'me_id', 'menú');

      const rolePermission = this.rolePermissionsRepository.create({ ...data, rp_permission_id, rp_menu_id });
      
      await queryRunner.manager.save(rolePermission);
      await queryRunner.commitTransaction();
      
      return rolePermission;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
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
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const rolePermission = await this.findOne(id);
      
      const { rp_permission_id, rp_menu_id, ...data } = updateRolePermissionDto;

      if (rp_permission_id !== rolePermission.rp_permission_id) await validateExistence(this.permissionRepository, rp_permission_id, 'pe_id', 'permiso');
      if (rp_menu_id !== rolePermission.rp_menu_id) await validateExistence(this.menuRepository, rp_menu_id, 'me_id', 'menú');
      
      const rolePermissionUpdated = await this.rolePermissionsRepository.preload({ rp_id: id, ...data, rp_permission_id, rp_menu_id });

      await queryRunner.manager.save(rolePermissionUpdated);
      await queryRunner.commitTransaction();
      
      return { message: 'Permiso de rol actualizado correctamente.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.findOne(id);
      await queryRunner.manager.delete(this.rolePermissionsRepository.target, id);
      await queryRunner.commitTransaction();
      return { message: 'Permiso de rol eliminado correctamente.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}