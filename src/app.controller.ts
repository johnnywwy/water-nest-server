import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/create')
  async create(): Promise<boolean> {
    // 创建用户
    return await this.userService.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      desc: 'This is a test user',
      account: '1234567890',
    });
  }

  @Get('/delete')
  async delete(): Promise<boolean> {
    // 创建用户
    return await this.userService.delete(
      '175f0c6c-58f9-4a85-a455-18c2cd80958a',
    );
  }

  @Get('/update')
  async update(): Promise<boolean> {
    // 创建用户
    return await this.userService.update(
      '8a2312cf-de5e-40fc-bea3-eb9de011a70a',
      {
        name: 'fuck',
        email: '123456@example.com',
        desc: '水滴管理员',
        account: 'ddddsddsdp',
      },
    );
  }

  // 查询用户
  @Get('/find')
  async find(): Promise<User> {
    // 创建用户
    return await this.userService.find('8a2312cf-de5e-40fc-bea3-eb9de011a70a');
  }

  @Get('/findBy')
  async findBy(): Promise<User> {
    // 创建用户
    return await this.userService.findBy('fuck');
  }
}
