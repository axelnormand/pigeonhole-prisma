import { GraphQLServer } from "graphql-yoga";
import { permissions } from "./permissions";
import { schema } from "./schema";
import { createContext } from "./context";

// read .env as soon as possible
require("dotenv").config();

new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions],
}).start(() => console.log(`🚀 Server ready at: http://localhost:4000`));
