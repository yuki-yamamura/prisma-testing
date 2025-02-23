import { PrismaClient, Prisma } from "@prisma/client";
import { prismaClient } from "@/infrastructure/prisma/client";

export const createFactory = <Model, CreateInput>(
  modelName: Prisma.ModelName,
  defaultAttributes: CreateInput
) => ({
  create: async (attributes?: Partial<CreateInput>): Promise<Model> => {
    const input = {
      ...defaultAttributes,
      ...attributes,
    };
    const model = `${modelName.charAt(0).toLowerCase()}${modelName.slice(1)}`;
    const include = buildPrismaInclude(input);

    return (prismaClient[model as keyof PrismaClient] as any).create({
      data: input,
      include: Object.keys(include).length > 0 ? include : undefined,
    });
  },

  createList: async (count: number): Promise<Model[]> => {
    return Promise.all(
      new Array(count).map(async () => {
        return createFactory<Model, CreateInput>(
          modelName,
          defaultAttributes
        ).create();
      })
    );
  },
});

const buildPrismaInclude = (input: {}) => {
  return Object.entries(input).reduce(
    (prev: Record<string, Object | Boolean>, [key, value]) => {
      if (value && typeof value === "object") {
        if (
          "create" in value &&
          value.create &&
          typeof value.create === "object"
        ) {
          prev[key] = buildPrismaInclude(value.create);
        } else {
          prev[key] = true;
        }
      }

      return prev;
    },
    {}
  );
};
