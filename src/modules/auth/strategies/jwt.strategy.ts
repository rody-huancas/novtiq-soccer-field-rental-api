import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
/* Interfaces */
import { JwtPayload } from '../interfaces/jwt-payload.interface';
/* Entities */
import { User } from '@modules/users/entities/user.entity';
/* Config */
import { JWT_SECRET } from '@config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({ secretOrKey: JWT_SECRET, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
  }

  /**
  * Método para validar y decodificar el payload del token JWT.
  * @param payload Payload del token JWT que contiene el ID del usuario.
  * @returns Usuario asociado al token JWT si existe y está activo.
  * @throws UnauthorizedException Si el token no es válido o el usuario asociado está inactivo.
  */
  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOne({ where: { us_id: id } });

    if (!user) throw new UnauthorizedException('El token no es válido');
    if (!user.us_is_active) throw new UnauthorizedException('El usuario está inactivo, hable con un administrador');

    return user;
  }
}