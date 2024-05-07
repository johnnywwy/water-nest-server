import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DeepPartial, Repository } from 'typeorm';

// import { User } from './models/auth.entity';
import { EmailService } from '../email/email.service';

function generateNumericVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

@Injectable()
export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  //发送邮箱验证码
  async sendEmailCode(email: string): Promise<boolean> {
    console.log('email', email);
    const verificationCode = generateNumericVerificationCode();

    try {
      const result = await this.emailService.sendVerificationEmail(
        email,
        verificationCode,
      );
      if (result) {
        // 邮件发送成功
        console.log('Email sent successfully');
        return true;
      } else {
        // 邮件发送失败
        console.error('Email failed to send');
        return false;
      }
    } catch (error) {
      // 发送过程中发生错误
      console.error('Error sending email:', error);
      return false;
    }
    //发送邮件
  }
}
