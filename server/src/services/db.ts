import { Context } from "../context";

/** get all push tokens (ie have entry in admin notes) to send stuff to */
export const getPushTokens = async (ctx: Context): Promise<string[]> => {
  const usersWithTokens = await ctx.prisma.punbb_user.findMany({
    where: {
      tokens: {
        notIn: [""],
      },
    },
  });
  const tokens = usersWithTokens.map(user => user.tokens?.split(',')).filter(a => !!a);
  const flatTokens = Array.prototype.concat.apply([], tokens);
  return flatTokens;
};
