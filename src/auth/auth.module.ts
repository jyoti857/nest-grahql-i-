import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtSecret } from './constants';

@Module({
  imports: [
    UsersModule, 
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {expiresIn: '3600s'}
    })
  ],
  providers: [AuthService]
})
export class AuthModule {}
