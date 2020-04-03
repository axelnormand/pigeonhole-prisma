import { verify } from "jsonwebtoken";
import { Context } from "./context";
import { config } from "./config";

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const { appSecret } = config();
  if (!appSecret) {
    throw new Error("process.env.APP_SECRET is blank");
  }
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, appSecret) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}
