/* Libraries */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* DTOs */
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
/* Entities */
import { Menu } from './entities/menu.entity';
/* Utils */
import { ActionType } from '@utils/functions/types';
import { checkExistence } from '@utils/checkExistence';
import { validateExistence } from '@utils/validateExistence';
import { createActionMessage } from '@utils/functions';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    private dataSource: DataSource
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { me_name, ...data } = createMenuDto;

      await checkExistence(this.menuRepository, 'me_name', me_name);

      const menu = this.menuRepository.create({ me_name, ...data });

      await queryRunner.manager.save(menu);
      await queryRunner.commitTransaction();

      return createActionMessage('menú', menu.me_name, ActionType.Create);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const menus = await this.menuRepository.find();
      return menus;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const menu = await validateExistence(this.menuRepository, id, 'me_id', 'Menú');
      return menu;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const menu = await this.findOne(id);
      
      const { me_name, ...data } = updateMenuDto;

      if (me_name !== menu.me_name) await checkExistence(this.menuRepository, 'me_name', me_name);
      
      const menuUpdated = await this.menuRepository.preload({...menu,...data,me_name});

      await queryRunner.manager.save(menuUpdated);
      await queryRunner.commitTransaction();

      return createActionMessage('menú', menuUpdated.me_name, ActionType.Update);
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
      const menu = await this.findOne(id);
      
      await queryRunner.manager.delete(this.menuRepository.target, menu.me_id);
      await queryRunner.commitTransaction();
      
      return createActionMessage('menú', menu.me_name, ActionType.Delete);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
