import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* Entities */
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
/* Entities */
import { User } from './entities/user.entity';
import { Role } from '@modules/roles/roles/entities/role.entity';
/* Utils */
import { ActionType } from '@utils/functions/types';
import { checkExistence } from '@utils/checkExistence';
import { validateExistence } from '@utils/validateExistence';
import { createActionMessage } from '@utils/functions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private dataSource: DataSource
  ) {}

  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { us_username, us_password, us_status, us_role_id } = createUserDto;

      await checkExistence(this.userRepository, 'us_username', us_username);
      await checkExistence(this.roleRepository, 'ro_id', us_role_id);

      const user = this.userRepository.create({ us_username, us_password, us_status, us_role_id });

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return createActionMessage('usuario', user.us_username, ActionType.Create);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({ relations: ['role', 'person'] });
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const user = await validateExistence(this.userRepository, id, 'us_id', 'Usuario');
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.findOne(id);
      
      const { us_username, us_password, us_status, us_role_id, ...data } = updateUserDto;

      if (us_username !== user.us_username) await checkExistence(this.userRepository, 'us_username', us_username);
      if (us_role_id !== user.us_role_id)   await checkExistence(this.roleRepository, 'ro_id', us_role_id);

      await this.userRepository.preload({ us_id: id, ...data,us_username});

      await queryRunner.manager.update(User, id, { us_username, us_password, us_status, us_role_id });
      await queryRunner.commitTransaction();

      return createActionMessage('usuario', user.us_username, ActionType.Update); 
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
      const user = await this.findOne(id);

      await queryRunner.manager.delete(this.userRepository.target, user.us_id);
      await queryRunner.commitTransaction();
      
      return createActionMessage('usuario', user.us_username, ActionType.Delete);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
