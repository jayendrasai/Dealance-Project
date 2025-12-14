import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import  { PrismaClient }  from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  // This is the constructor where you might configure the client,
  // but by default, it just uses the DATABASE_URL environment variable.
  // constructor() {
  //   super({
  //     datasources: {
  //       db: { url: process.env.DATABASE_URL },
  //     },
  //   });
  // }
  //  constructor() {
  //   super({
  //     datasourceUrl: process.env.DATABASE_URL,
  //   });
  // }
  constructor() {
    super({ adapter });
  }

  // 💡 Why use onModuleInit?
  // Ensures a connection to the database is successfully established 
  // before any other service or resolver attempts to use it.
  async onModuleInit() {
    await this.$connect();
  }

  // 💡 Why use onModuleDestroy?
  // Gracefully disconnects the PrismaClient from the database 
  // when the NestJS application shuts down, preventing open connections.
  async onModuleDestroy() {
    await this.$disconnect();
  }
  
  // You can add helper methods here if needed, but for now,
  // other services can just use 'this.prisma.user.findMany(...)' directly.
}