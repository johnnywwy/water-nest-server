// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';

// import { User } from './models/auth.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EmailService } from '../email/email.service';

@Module({
  imports: [], // TypeOrmModule.forFeature([User])

  providers: [ConsoleLogger, AuthService, AuthResolver, EmailService],
  exports: [],
})
export class AuthModule {}
