import { CreateResult } from 'src/common/dto/result.type';
import { AuthService } from './auth.service';
import {
  Args,
  // Context,
  Mutation,
  // Query,
  Resolver,
} from '@nestjs/graphql';
// import { UserInput } from './dto/user-input.type';
// import { UserType } from './dto/user.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean, { description: '发送邮箱验证码' })
  async sendEmailCode(@Args('params') params: string): Promise<boolean> {
    const res = await this.authService.sendEmailCode(params);
    return res;
  }

  // @Query(() => UserType, { description: '使用 ID 查询用户' })
  // async find(@Args('id') id: string): Promise<UserType> {
  //   return await this.authService.find(id);
  // }

  // @Query(() => UserType, { description: '更新用户' })
  // async update(
  //   @Args('id') id: string,
  //   @Args('params') params: UserInput,
  // ): Promise<boolean> {
  //   return await this.authService.update(id, params);
  // }

  // @Mutation(() => Boolean, { description: '删除用户' })
  // async delete(@Args('id') id: string): Promise<boolean> {
  //   return await this.authService.delete(id);
  // }
}
