import { Context } from "../context";

/** get all push tokens (ie have entry in admin notes) to send stuff to */
export const getPushTokens = async (ctx: Context): Promise<string[]> => {
  const usersWithAdminNotes = await ctx.prisma.punbb_user.findMany({
    where: {
      admin_note: {
        notIn: [""],
      },
    },
  });
  const tokens = usersWithAdminNotes.map(user => user.admin_note?.split(',')).filter(a => !!a);
  const flatTokens = Array.prototype.concat.apply([], tokens);
  return flatTokens;
};
