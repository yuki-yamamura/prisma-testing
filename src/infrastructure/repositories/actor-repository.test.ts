import { Prisma } from "@prisma/client";
import { ActorRepository } from "./actor-repository";
import { prismaClient } from "@/infrastructure/prisma";

describe("ActorRepository", () => {
  describe("save", () => {
    test("should save an actor", async () => {
      // Arrange
      const actorRepository = new ActorRepository(prismaClient);
      const actor: Prisma.ActorCreateInput = {
        firstName: "Alice",
        lastName: "Carroll",
      };
      const expectedActorCount = (await prismaClient.actor.count()) + 1;

      // Act
      const createdActor = await actorRepository.save({ data: actor });

      // Assert
      expect(await prismaClient.actor.count()).toBe(expectedActorCount);
      expect(createdActor).toEqual(
        await prismaClient.actor.findUnique({
          where: { actorId: createdActor.actorId },
        })
      );
    });
  });
});
