import { Controller } from '@nestjs/common';
import { SeedersService } from '../services/seeders.service';


@Controller('seeders')
export class SeedersController {
  constructor(private readonly seedersService: SeedersService) {}
  
  
}
