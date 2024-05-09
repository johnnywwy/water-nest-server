import { Injectable } from '@nestjs/common';
// import { NestRedisService } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor() {
    // 在构造函数中初始化 Redis 客户端
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  getClient(): Redis {
    return this.redisClient;
  }

  async setValue(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string): Promise<string> {
    return await this.redisClient.get(key);
  }
}
