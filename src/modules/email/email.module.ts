import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { RedisService } from '../redis/redis.service';

@Module({
  providers: [EmailResolver, EmailService, RedisService],
  exports: [EmailService],
})
export class EmailModule {}
