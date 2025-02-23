import { serve } from "@hono/node-server";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  const prisma = new PrismaClient();
  const actors = await prisma.actor.findMany();

  return c.json({
    actorCount: actors.length,
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
