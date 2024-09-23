import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* DTOs */
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
/* Entities */
import { Role } from './entities/role.entity';
/* Utils */
import { checkExistence } from '@utils/checkExistence';
import { validateExistence } from '@utils/validateExistence';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private dataSource: DataSource
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { ro_name, ...data } = createRoleDto;

      /* Verificar si el nombre del rol ya existe */
      await checkExistence(this.roleRepository, 'ro_name', ro_name);

      const role = this.roleRepository.create({ ro_name, ...data });

      await queryRunner.manager.save(role);
      await queryRunner.commitTransaction();

      return { message: `El rol '${ro_name}' ha sido creado correctamente.` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.find();
      return roles;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const role = await validateExistence(this.roleRepository, id, 'ro_id', 'Rol');
      return role;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const role = await this.findOne(id);
      
      const { ro_name, ...data } = updateRoleDto;

      if (ro_name !== role.ro_name) await checkExistence(this.roleRepository, 'ro_name', ro_name);

      const roleUpdated = await this.roleRepository.preload({...role,...data,ro_name});

      await queryRunner.manager.save(roleUpdated);
      await queryRunner.commitTransaction();
      
      return { message: `El rol '${ro_name}' ha sido actualizado correctamente.` };
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
      const role = await this.findOne(id);

      await queryRunner.manager.delete(this.roleRepository.target, role.ro_id);
      await queryRunner.commitTransaction();

      return { message: `Rol '${role.ro_name}' eliminado correctamente.` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
