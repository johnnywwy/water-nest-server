// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';

// import { User } from './models/auth.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EmailService } from '../email/email.service';
import { UserModule } from '../user/user.module';
// import { User } from './models/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'fkdFYwkcLRVxQOKk',
      signOptions: { expiresIn: '60s' },
    }),
  ], // TypeOrmModule.forFeature([User])
  providers: [
    ConsoleLogger,
    AuthService,
    AuthResolver,
    EmailService,
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
