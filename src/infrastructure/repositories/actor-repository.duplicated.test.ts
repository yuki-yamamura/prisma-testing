import { Prisma } from "@prisma/client";
import { ActorRepository } from "./actor-repository";
import { prismaClient } from "@/infrastructure/prisma";
// import { actorFactory } from "@/__tests__/factories/actor";

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

  // describe("findMany", async () => {
  //   beforeEach(async () => {
  //     async function cleanupDatabase() {
  //       const tableNames = Prisma.dmmf.datamodel.models.map(
  //         (model) => model.dbName
  //       );
  //       for (const table of tableNames) {
  //         await prismaClient.$queryRawUnsafe(
  //           `TRUNCATE TABLE "${table}" CASCADE`
  //         );
  //       }
  //     }
  //     await cleanupDatabase();
  //   });
  //   test("should return all actors", async () => {
  //     // Arrange
  //     const actorRepository = new ActorRepository(prismaClient);
  //     const expected = await actorFactory.createList(2);

  //     // Act
  //     const actual = await actorRepository.findMany();

  //     // Assert
  //     expect(actual).toEqual(expected);
  //   });
  // });
});
