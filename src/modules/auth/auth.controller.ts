import { Controller, Post, Body, Get } from '@nestjs/common';
/* Services */
import { AuthService } from './auth.service';
/* DTO */
import { LoginDto } from './dto/login.dto';
/* Entities */
import { User } from '../users/entities/user.entity';
/* Decorators */
import { Auth, GetUser } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('check-status')
  @Auth()
  checkStatus(@GetUser() user: User ) {
    return this.authService.checkAuthStatus(user);
  }
}
