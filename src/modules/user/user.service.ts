import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}

  // 新增一个用户
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    console.log('res', res);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
    return false;
  }

  // 删除用户
  async delete(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }

  // 更新用户
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }

  // 查询一个用户
  async find(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  //   // 通过name id 或者 邮箱查询

  async findBy(name: string): Promise<User> {
    const res = this.UserRepository.findOne({
      where: {
        name,
      },
    });

    return res;
  }
}
