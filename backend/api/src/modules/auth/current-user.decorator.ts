// services/api/src/modules/auth/current-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// 💡 Why this decorator?
// Instead of writing 'const request = context.getContext().req; return request.user;' 
// in every secure resolver, you can just write '@CurrentUser() user: any'
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);