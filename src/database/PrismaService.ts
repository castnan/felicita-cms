import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User, Clothing } from '@prisma/client';

interface ExtendedPrismaClient extends PrismaClient {
  $connect(): Promise<void>;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, ExtendedPrismaClient {
  clothes: Clothing; 
  prismaUser: User;

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

}
