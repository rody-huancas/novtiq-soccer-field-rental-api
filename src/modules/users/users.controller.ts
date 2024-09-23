import { Controller,  Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
/* Services */
import { UsersService } from './users.service';
/* DTOs */
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
/* Decorators */
import { ValidateUUIDFormatPipe } from '@common/decorators/is-uuid-format.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateUUIDFormatPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ValidateUUIDFormatPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateUUIDFormatPipe) id: string) {
    return this.usersService.remove(id);
  }
}
