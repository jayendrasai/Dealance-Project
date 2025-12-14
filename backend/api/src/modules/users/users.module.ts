// services/api/src/modules/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  // 💡 Export the service so it can be injected into the Auth module's AuthService
  exports: [UsersService], 
})
export class UsersModule {}