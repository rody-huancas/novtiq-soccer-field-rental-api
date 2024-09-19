import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* Libraries */
import { Repository } from 'typeorm';
/* DTOs */
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
/* Entities */
import { Menu } from './entities/menu.entity';
/* Utils */
import { checkExistence } from '@utils/functions-validations.util';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    try {
      const { me_name, ...data } = createMenuDto;

      /* Verificar si el nombre del menú ya existe */
      await checkExistence(this.menuRepository, 'me_name', me_name);
      
      await this.menuRepository.save({ ...data, me_name });
      
      return {
        message: `El menú '${me_name}' ha sido creado exitosamente`,
        statusCode: 201
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.menuRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
