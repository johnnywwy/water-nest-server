import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Page {
  @Field(() => Int)
  total?: number;

  @Field(() => Int)
  start?: number;

  @Field(() => Int)
  length?: number; // 每页显示条数
}
