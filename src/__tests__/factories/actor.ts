import { fakerJA } from "@faker-js/faker";
import { Prisma, type Actor } from "@prisma/client";
import { createFactory } from "@/__tests__/helpers/factory.js";

export const actorDefaultAttributes: Prisma.ActorCreateInput = {
  firstName: fakerJA.person.firstName(),
  lastName: fakerJA.person.lastName(),
};

export const actorFactory = createFactory<Actor, Prisma.ActorCreateInput>(
  "Actor",
  actorDefaultAttributes
);
