import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  CODE_NOT_EXPIRE,
  EMAIL_ERROR,
  LOGIN_ERROR,
  SUCCESS,
} from 'src/common/constants/code';
import { Result } from 'src/common/dto/result.type';

const EXPIRATION_TIME = 5 * 60 * 1000; // 5分钟

function generateNumericVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //发送邮箱验证码
  async sendEmailCode(email: string): Promise<Result> {
    console.log('email', email);
    // 从数据库获取用户和验证码信息
    const user = await this.userService.findByEmail(email);

    if (!user) {
      // 如果用户不存在，则返回false
      return;
    }

    // 生成新的验证码
    const verificationCode = generateNumericVerificationCode();

    // 更新数据库中的验证码和过期时间，即使验证码未过期也重新发送相同验证码
    const currentTime = Date.now();
    await this.userService.update(user.id, {
      code: verificationCode,
      codeExpire: String(currentTime + EXPIRATION_TIME),
    });

    // 发送验证码邮件
    try {
      const result = await this.emailService.sendVerificationEmail(
        email,
        verificationCode,
      );
      if (result) {
        // 邮件发送成功
        console.log('邮件发送成功');
        return {
          code: SUCCESS,
          message: '邮件发送成功',
        };
      } else {
        // 邮件发送失败
        console.error('邮件发送失败');
        return {
          code: EMAIL_ERROR,
          message: '邮件发送失败',
        };
      }
    } catch (error) {
      // 发送过程中发生错误
      console.error('发送过程中发生错误', error);
      return {
        code: EMAIL_ERROR,
        message: '邮件发送失败',
      };
    }
  }

  // 登录
  async login(email: string, code: string): Promise<Result> {
    // 从数据库获取用户信息
    const user = await this.userService.findByEmail(email);

    if (!user) return;

    // 检查验证码是否正确
    if (user.code === code) {
      // 获取当前时间
      const currentTime = Date.now();
      // 将数据库中存储的过期时间转换为数字
      const codeExpire = parseInt(user.codeExpire);

      // 检查验证码是否过期
      if (currentTime <= codeExpire) {
        // 验证码未过期且正确

        const token = this.jwtService.sign({ id: user.id });
        console.log('tokentoken', token);

        return {
          code: SUCCESS,
          message: '登录成功',
          data: token,
        };
      } else {
        // 验证码已过期
        console.error('验证码已过期');
        return {
          code: CODE_NOT_EXPIRE,
          message: '验证码已过期',
        };
      }
    } else {
      // 验证码不正确
      return {
        code: LOGIN_ERROR,
        message: '登录失败，邮箱或验证码错误',
      };
    }
  }
}
