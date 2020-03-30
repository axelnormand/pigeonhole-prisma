import { prisma } from "@axelnormand/pigeonhole-prisma-client";
import datamodelInfo from "@axelnormand/pigeonhole-nexus-client";
import * as path from "path";
import { stringArg, idArg } from "nexus";
import { prismaObjectType, makePrismaSchema } from "nexus-prisma";

const Query = prismaObjectType<"Query">({
  name: "Query",
  definition(t) {
    // t.prismaFields(["post"]);
    // t.list.field("feed", {
    //   type: "Post",
    //   resolve: (_, args, ctx) =>
    //     ctx.prisma.posts({ where: { published: true } }),
    // });
    // t.list.field("postsByUser", {
    //   type: "Post",
    //   args: { email: stringArg() },
    //   resolve: (_, { email }, ctx) =>
    //     ctx.prisma.posts({ where: { author: { email } } }),
    // });
  },
});

const Mutation = prismaObjectType<"Mutation">({
  name: "Mutation",
  definition(t) {
    // t.prismaFields(["createUser", "deletePost"]);
    // t.field("createDraft", {
    //   type: "Post",
    //   args: {
    //     title: stringArg(),
    //     authorId: idArg({ nullable: true })
    //   },
    //   resolve: (_, { title, authorId }, ctx) =>
    //     ctx.prisma.createPost({
    //       title,
    //       author: { connect: { id: authorId } }
    //     })
    // });
    // t.field("publish", {
    //   type: "Post",
    //   nullable: true,
    //   args: { id: idArg() },
    //   resolve: (_, { id }, ctx) =>
    //     ctx.prisma.updatePost({
    //       where: { id },
    //       data: { published: true }
    //     })
    // });
  },
});

export const schema = makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, "./generated/schema.graphql"),
    typegen: path.join(__dirname, "./generated/nexus.ts"),
  },
});
