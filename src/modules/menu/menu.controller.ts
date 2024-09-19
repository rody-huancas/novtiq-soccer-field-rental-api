import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
/* Services */
import { MenuService } from './menu.service';
/* DTOs */
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
/* Decorators */
import { ValidateUUIDFormatPipe } from '@common/decorators/is-uuid-format.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateUUIDFormatPipe) id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ValidateUUIDFormatPipe) id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateUUIDFormatPipe) id: string) {
    return this.menuService.remove(id);
  }
}
