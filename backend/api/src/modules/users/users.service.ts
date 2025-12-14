// services/api/src/modules/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';
//import { User } from './models/user.model';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Retrieves the full user record by ID (used by the 'me' query)
  findById(id: string) {
    return this.prisma.user.findUnique({ 
      where: { id },
      // Select fields you need, or rely on the GraphQL type system validation
    });
  }

  // Used by the Auth service during login/signup checks
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // Updates the user's profile fields
  // async updateProfile(userId: string, input: UpdateProfileInput) {
  //   // Note: We are updating the root User model directly for MVP simplicity.
  //   // In the future, you might update the separate 'Profile' model.

  //   return this.prisma.user.update({
  //     where: { id: userId },
  //     data: {
  //       name: input.fullName, // Map GraphQL field back to Prisma field
  //       bio: input.bio,
  //       // Only update fields that are provided in the input
  //     },
  //   });
  // }

//   async updateProfile(userId: string, input: UpdateProfileInput) {
//   return this.prisma.user.update({
//     where: { id: userId },
//     data: {
//       name: input.fullName ?? undefined,
//       profile: {
//         update: {
//           bio: input.bio ?? undefined,
//           avatarUrl: input.avatarUrl ?? undefined,
//         }
//       }
//     },
//     include: { profile: true }
//   });
// }

async updateProfile(userId: string, input: UpdateProfileInput) {
  return this.prisma.user.update({
    where: { id: userId },
    data: {
      name: input.fullName ?? undefined,
      profile: {
        upsert: {
          create: {
            bio: input.bio ?? null,
            avatarUrl: input.avatarUrl ?? null,
          },
          update: {
            bio: input.bio ?? undefined,
            avatarUrl: input.avatarUrl ?? undefined,
          }
        }
      }
    },
    include: { profile: true },
  });
}

}