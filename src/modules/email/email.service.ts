import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.163.com', // SMTP 服务器
    port: 465, // SMTP 端口
    secure: true, // 使用 SSL
    auth: {
      user: 'johnnywwy@163.com', // 你的 163 邮箱用户名
      pass: 'VHPMXGBTKSRJFSUO', // 你的 163 邮箱密码或授权码
    },
  });

  async sendVerificationEmail(
    to: string,
    verificationCode: string,
  ): Promise<any> {
    const mailOptions = {
      from: 'johnnywwy@163.com',
      to,
      subject: '邮箱验证码',
      text: `你的验证码是: ${verificationCode}`,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}
