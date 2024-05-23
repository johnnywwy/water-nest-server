// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';

// import { User } from './models/auth.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EmailService } from '../email/email.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { StudentService } from '../student/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/models/user.entity';
import { Student } from '../student/models/student.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student]),
    JwtModule.register({
      secret: 'fkdFYwkcLRVxQOKk',
      // 设置过期时间 1天
      signOptions: { expiresIn: 60 * 60 * 24 + 's' },
    }),
  ], // TypeOrmModule.forFeature([User])
  providers: [
    ConsoleLogger,
    AuthService,
    AuthResolver,
    EmailService,
    UserService,
    JwtStrategy,
    StudentService,
  ],
  exports: [],
})
export class AuthModule {}
