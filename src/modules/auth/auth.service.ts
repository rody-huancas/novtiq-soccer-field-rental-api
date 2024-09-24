import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
// DTO
import { LoginDto } from './dto/login.dto';
// Módulos
import { User } from '@modules/users/entities/user.entity';
// Interfaces
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { us_username: username } });
    if (!user) throw new UnauthorizedException("Credenciales no válidas");

    const isPasswordMatched = await bcrypt.compare(password, user.us_password);
    if (!isPasswordMatched) throw new UnauthorizedException("Credenciales no válidas");

    return { ...user, token: this.getJwtToken({ id: user.us_id }) };
  }

  async checkAuthStatus(user: User) {
    return { ...user, token: this.getJwtToken({ id: user.us_id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}