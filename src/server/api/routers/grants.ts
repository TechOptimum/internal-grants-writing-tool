import { z } from "zod";

import { createTRPCRouter, protectedProcedure, adminProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";

import { utapi } from "uploadthing/server";

export const grantsRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        title: z.string(),
        amount: z.number(),
        description: z.string(),
        criteria: z.string(),
        endDate: z.date(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.grant.create({
        data: {
          title: input.title,
          amount: input.amount,
          description: input.description,
          criteria: input.criteria,
          endDate: input.endDate,
          available: true,
        },
      });
    }),

  getGrants: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.grant.findMany();
  }),

  deleteGrant: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.grant.delete({
        where: {
          id: input.id,
        },
      });
    }),

  updateGrant: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        amount: z.number(),
        description: z.string(),
        criteria: z.string(),
        endDate: z.date(),
        available: z.boolean(),
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
          endDate: input.endDate,
          available: input.available,
        },
      });
    }),
  assignGrant: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        grantId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.grant.update({
        where: {
          id: input.grantId,
        },
        data: {
          available: false,
          assignedTo: input.userId,
        },
      });
    }),
  unassignGrant: adminProcedure
    .input(
      z.object({
        grantId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.grant.update({
        where: {
          id: input.grantId,
        },
        data: {
          available: true,
          assignedTo: "",
        },
      });
    }),
  getAssignedGrants: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.grant.findMany({
        where: {
          assignedTo: input.userId,
        },
      });
    }),
  getAllAssignedGrants: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.grant.findMany({
      where: {
        assignedTo: {
          not: "",
        },
      },
    });
  }),
  getUserById: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await clerkClient.users.getUser(input.userId);
    }),
  createUpload: protectedProcedure
    .input(
      z.object({
        url: z.string(),
        name: z.string(),
        grantId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.uploads.create({
        data: {
          userId: ctx.auth.userId,
          url: input.url,
          name: input.name,
          grantId: input.grantId,
        },
      });
    }),
  getUploads: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.uploads.findMany({
      include: {
        grant: true,
      },
    });
  }),
  deleteUpload: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await utapi.deleteFiles(input.name);
      return ctx.prisma.uploads.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
