import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Result {
  @Field({ description: '状态码' })
  code: number;

  @Field({ description: '信息' })
  message?: string;

  @Field({ description: '数据' })
  data?: string; // 返回的数据
}
