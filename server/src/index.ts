import { prisma } from "@axelnormand/pigeonhole-prisma-client";
import { GraphQLServer } from "graphql-yoga";
import { schema } from "./schema";

async function main() {
  const server = new GraphQLServer({
    schema,
    context: { prisma }
  });
  server.start(() => console.log("Server is running on http://localhost:4000"));
}

main().catch(e => console.error(e));
