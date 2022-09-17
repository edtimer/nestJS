import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    //switch to http can be switch to RPC when using microservices
    const request: Express.Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
