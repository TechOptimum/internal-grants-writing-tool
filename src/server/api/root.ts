import { grantsRouter } from "~/server/api/routers/grants";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  grants: grantsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
