import { greetingRouter } from "~/server/api/routers/greeting";
import { personRouter } from "~/server/api/routers/person";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  greeting: greetingRouter,
  person: personRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
