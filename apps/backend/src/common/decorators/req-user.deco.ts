import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../../app/users';

type RequestUserType = Awaited<ReturnType<UsersService['findOneByEmail']>>;

export const ReqUser = createParamDecorator(
  (_, ctx: ExecutionContext): RequestUserType => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
