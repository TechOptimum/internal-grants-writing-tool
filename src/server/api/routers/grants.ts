import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const grantsRouter = createTRPCRouter({
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          amount: z.number(),
          description: z.string(),
          criteria: z.string(),
        })
      )
      .mutation(({ ctx, input }) => {
        return ctx.prisma.grant.create({
          data: {
            title: input.title,
            amount: input.amount,
            description: input.description,
            criteria: input.criteria,
          },
        });
      }),
      
      getGrants: protectedProcedure
      .query(({ ctx }) => {
        return ctx.prisma.grant.findMany();
      }),

      deleteGrant: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return ctx.prisma.grant.delete({
          where: {
            id: input.id,
          },
        });
      }),

      updateGrant: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          title: z.string(),
          amount: z.number(),
          description: z.string(),
          criteria: z.string(),
        })
      )
      .mutation(({ ctx, input }) => {
        return ctx.prisma.grant.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            amount: input.amount,
            description: input.description,
            criteria: input.criteria,
          },
        });
      }),
      
    
  });
  