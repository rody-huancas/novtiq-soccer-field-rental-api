import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* DTOs */
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
/* Entities */
import { Permission } from './entities/permission.entity';
/* Utils */
import { ActionType } from '@utils/functions/types';
import { checkExistence } from '@utils/checkExistence';
import { validateExistence } from '@utils/validateExistence';
import { createActionMessage } from '@utils/functions';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    private dataSource: DataSource
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { pe_name, ...data } = createPermissionDto;

      await checkExistence(this.permissionRepository, 'pe_name', pe_name);
      
      await queryRunner.manager.save(Permission, { ...data, pe_name });
      
      await queryRunner.commitTransaction();

      return createActionMessage('permiso', pe_name, ActionType.Create);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const permissions = await this.permissionRepository.find();
      return permissions;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const permission = await validateExistence(this.permissionRepository, id, 'pe_id', 'Permiso');
      return permission;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const permission = await this.findOne(id);

      const { pe_name, ...data } = updatePermissionDto;

      /* Verificar si el nombre del permiso ya existe */
      if (pe_name !== permission.pe_name) await checkExistence(this.permissionRepository, 'pe_name', pe_name);

      const permissionUpdated = await this.permissionRepository.preload({ pe_id: id, ...data, pe_name });

      await queryRunner.manager.save(permissionUpdated);
      await queryRunner.commitTransaction();
      
      return createActionMessage('permiso', permissionUpdated.pe_name, ActionType.Update);
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
      const permission = await this.findOne(id);
      await queryRunner.manager.delete(Permission, id);
      
      await queryRunner.commitTransaction();
      return createActionMessage('permiso', permission.pe_name, ActionType.Delete);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
