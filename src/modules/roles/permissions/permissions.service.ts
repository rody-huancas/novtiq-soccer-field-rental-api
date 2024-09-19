import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* DTOs */
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
/* Entities */
import { Permission } from './entities/permission.entity';
/* Utils */
import { checkExistence } from '@utils/functions-validations.util';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const { pe_name, ...data } = createPermissionDto;

      /* Verificar si el nombre del permiso ya existe */
      await checkExistence(this.permissionRepository, 'pe_name', pe_name);
      
      const newPermission = await this.permissionRepository.save({ ...data, pe_name });
      
      return newPermission;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
      const permission = await this.permissionRepository.findOne({ where: { pe_id: id } });
      if (!permission) {
        throw new HttpException(`Permiso con id '${id}' no encontrado.`, HttpStatus.NOT_FOUND);
      }
      return permission;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    try {
      const { pe_name, ...data } = updatePermissionDto;

      /* Verificar si el nombre del permiso ya existe */
      await checkExistence(this.permissionRepository, 'pe_name', pe_name);
      
      const updatedPermission = await this.permissionRepository.update(id, { ...data, pe_name });
      
      return updatedPermission;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const permission = await this.findOne(id);
      await this.permissionRepository.delete(id);
      return { message: `El permiso '${permission.pe_name}' ha sido eliminado correctamente.` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
