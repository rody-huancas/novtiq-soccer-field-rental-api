import { Controller, Get, Post, Body, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
/* Services */
import { BusinessService } from './business.service';
/* DTOs */
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
/* Decorators */
import { Auth } from '@modules/auth/decorators';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @Auth()
  @HttpCode(HttpStatus.CREATED)
  createOrUpdate(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.createOrUpdate(createBusinessDto);
  }

  @Get()
  findBusiness() {
    return this.businessService.findBusiness();
  }

  @Patch()
  @Auth()
  updateBusiness(@Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.updateBusiness(updateBusinessDto);
  }

  @Delete()
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeBusiness() {
    return this.businessService.removeBusiness();
  }
}