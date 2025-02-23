import type { PrismaClient } from "@prisma/client";
import { PrismaEnvironmentDelegate } from "@quramy/jest-prisma-core";
import { builtinEnvironments, type Environment } from "vitest/environments";

declare global {
  var vPrismaDelegate: PrismaEnvironmentDelegate;
  var vPrisma: {
    client: PrismaClient;
  };
}

const environment: Environment = {
  name: "vprisma",
  transformMode: "ssr",
  async setup(global, options) {
    const env = builtinEnvironments["node"];
    const envReturn = await env.setup(global, {});
    const delegate = new PrismaEnvironmentDelegate(
      {
        projectConfig: {
          testEnvironmentOptions: options,
        },
        globalConfig: {
          rootDir: "",
        },
      },
      {
        testPath: "",
      }
    );
    global.vPrismaDelegate = delegate;
    global.vPrisma = await delegate.preSetup();

    return {
      async teardown(global) {
        await delegate.teardown();
        await envReturn.teardown(global);
      },
    };
  },
};

export default environment;
