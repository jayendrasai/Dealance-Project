// services/api/src/modules/auth/guards/gql-auth.guard.ts

import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // 💡 Why this method?
  // GraphQL receives the request context differently than a standard REST endpoint.
  // This method extracts the raw request (which contains the JWT in headers) 
  // and makes it available to the underlying Passport strategy ('jwt').
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}