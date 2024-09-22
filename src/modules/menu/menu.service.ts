/* Libraries */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* DTOs */
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
/* Entities */
import { Menu } from './entities/menu.entity';
/* Utils */
import { checkExistence } from '@utils/checkExistence';
import { generateUrlFromString } from '@utils/functions';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    try {
      const { me_name, me_url, ...data } = createMenuDto;

      /* Verificar si el nombre del menú ya existe */
      await checkExistence(this.menuRepository, 'me_name', me_name);

      /* Generar la URL a partir del nombre del menú */
      let url = me_url;
      if (!url) url = generateUrlFromString(me_name);

      await this.menuRepository.save({ ...data, me_name, me_url: url });

      return { message: `El menú '${me_name}' ha sido creado correctamente.` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
      const menu = await this.menuRepository.findOne({ where: { me_id: id } });
      if (!menu) {
        throw new HttpException(`Menú con id '${id}' no encontrado.`, HttpStatus.NOT_FOUND);
      }
      return menu;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    try {
      const menu = await this.findOne(id);
      
      const { me_name, ...data } = updateMenuDto;

      /* Verificar si el nombre del menú ya existe */
      await checkExistence(this.menuRepository, 'me_name', me_name);
      
      const updatedMenu = await this.menuRepository.update(menu.me_id, { ...data, me_name });
      return updatedMenu;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const menu = await this.findOne(id);
      await this.menuRepository.delete(menu.me_id);
      return { message: `Menú ${menu.me_name} eliminado correctamente.` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
