import { Prisma, PrismaClient } from "@prisma/client";

export class ActorRepository {
  constructor(private prismaClient: PrismaClient | Prisma.TransactionClient) {}

  async save(args: Prisma.ActorCreateArgs) {
    return this.prismaClient.actor.create(args);
  }
}
