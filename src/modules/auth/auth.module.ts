// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';

// import { User } from './models/auth.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EmailService } from '../email/email.service';
import { UserModule } from '../user/user.module';
import { RedisCacheModule } from '../redis/redis.module';

@Module({
  imports: [UserModule, RedisCacheModule], // TypeOrmModule.forFeature([User])
  providers: [ConsoleLogger, AuthService, AuthResolver, EmailService],
  exports: [],
})
export class AuthModule {}
