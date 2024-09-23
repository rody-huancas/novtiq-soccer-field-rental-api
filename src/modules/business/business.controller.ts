import { Controller, Get, Post, Body, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
/* Services */
import { BusinessService } from './business.service';
/* DTOs */
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOrUpdate(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.createOrUpdate(createBusinessDto);
  }

  @Get()
  findBusiness() {
    return this.businessService.findBusiness();
  }

  @Patch()
  updateBusiness(@Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.updateBusiness(updateBusinessDto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeBusiness() {
    return this.businessService.removeBusiness();
  }
}