import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
/* Services */
import { AuthService } from './auth.service';
/* Controllers */
import { AuthController } from './auth.controller';
/* Strategies */
import { JwtStrategy } from './strategies/jwt.strategy';
/* Config */
import { JWT_SECRET } from '@config/env';
/* Entities */
import { User } from '@modules/users/entities/user.entity';

@Module({
  controllers: [ AuthController ],
  providers  : [ AuthService, JwtStrategy ],
  imports    : [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule  ],
      inject : [ ConfigService ],
      useFactory: () => {
        return {
          secret: JWT_SECRET,
        };
      },
    }),
    TypeOrmModule.forFeature([ User ])
  ],
  exports: [ JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
