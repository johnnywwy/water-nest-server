import { UserService } from './user.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guards';
import { Result } from '@/common/dto/result.type';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { description: '新增用户' })
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Query(() => UserType, { description: '使用 ID 查询用户' })
  async find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.find(id);
  }

  @Query(() => UserType, { description: '使用 ID 查询用户' })
  async getUserInfo(@Context() cxt: any): Promise<UserType> {
    // console.log(cxt.req.user)
    const id = cxt.req.user.id;
    return await this.userService.find(id);
  }

  @Mutation(() => Result, { description: '更新用户' })
  async updateUser(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<Result> {
    const res = await this.userService.update(id, params);
    if (res) {
      return {
        code: 200,
        message: '更新成功',
      };
    }
  }

  @Mutation(() => Boolean, { description: '删除用户' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return await this.userService.delete(id);
  }
}
