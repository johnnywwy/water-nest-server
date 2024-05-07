// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';

// import { User } from './models/auth.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EmailService } from '../email/email.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule], // TypeOrmModule.forFeature([User])
  providers: [ConsoleLogger, AuthService, AuthResolver, EmailService],
  exports: [],
})
export class AuthModule {}
