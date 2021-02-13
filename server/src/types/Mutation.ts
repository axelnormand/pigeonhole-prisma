import { getUserId } from '../auth';
import { Context } from 'context';
import sha1 from 'crypto-js/sha1';
import { sign } from 'jsonwebtoken';
import { mutationType, nonNull, stringArg } from 'nexus';
import { config } from '../config';
import { LoginResultType } from './AuthPayload';

export const Mutation = mutationType({
  definition(t) {
    // t.field('signup', {
    //   type: 'AuthPayload',
    //   args: {
    //     name: stringArg(),
    //     email: stringArg({ nullable: false }),
    //     password: stringArg({ nullable: false }),
    //   },
    //   resolve: async (_parent, { name, email, password }, ctx:Context) => {
    //     const hashedPassword = await hash(password, 10);
    //     const user = await ctx.prisma.user.create({
    //       data: {
    //         name,
    //         email,
    //         password: hashedPassword,
    //       },
    //     });
    //     return {
    //       token: sign({ userId: user.id }, process.env.APP_SECRET),
    //       user,
    //     };
    //   },
    // });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { username, password }, ctx:Context) => {
        const lowerUsername = username.toLowerCase();
        try {
          console.log(`Login mutation: Querying for ${lowerUsername}`);
          const users = await ctx.prisma.punbb_user.findMany({
            where: {
              OR: [{ username: lowerUsername }, { email: lowerUsername }],
            },
          });
          if (!users || !users.length) {
            console.log(`Login mutation: no users found for ${lowerUsername}`);
            return {
              loginResult: LoginResultType.INVALID,
            };
          }
          if (users.length > 1) {
            console.log(
              `Login mutation: ${users.length} users (!) for ${lowerUsername}`,
            );
            return { loginResult: LoginResultType.ERROR };
          }
          const user = users[0];

          const passwordValid = sha1(password).toString() === user.password;
          if (!passwordValid) {
            console.log(
              `Login mutation: invalid password for ${lowerUsername}`,
            );
            return { loginResult: LoginResultType.INVALID };
          }
          const token = sign({ userId: user.id }, config().appSecret);
          console.log(`Login mutation: user ${lowerUsername} is id ${user.id}`);
          return {
            loginResult: LoginResultType.SUCCESS,
            token,
          };
        } catch (e) {
          console.error(
            `Login mutation: ERROR for ${lowerUsername}: ${e.message}`,
            e,
          );
        }
      },
    });

    t.field('updatePushToken', {
      type: 'punbb_user',
      args: {
        token: nonNull(stringArg()),
      },
      resolve: (_parent, { token }, ctx: Context) => {
        const userId = getUserId(ctx);
        if (!userId) throw new Error('Could not find user.');
        return ctx.prisma.punbb_user.update({
          data: {
            admin_note: token,
          }, where: {
            id: userId
          }
        });
      },
    });

    // t.field('createTopic', {
    //   type: 'punbb_topics',
    //   args: {
    //     subject: stringArg({ required: true }),
    //   },
    //   resolve: (_parent, { title, content }, ctx:Context) => {
    //     const userId = getUserId(ctx:Context);
    //     if (!userId) throw new Error('Could not authenticate user.');
    //     return ctx.prisma.punbb_topics.create({
    //       data: {
    //         subject,
    //         author: { connect: { id: Number(userId) } },
    //       },
    //     });
    //   },
    // });

    // t.field('updateTopic', {
    //   type: 'punbb_topics',
    //   nullable: true,
    //   args: { id: intArg() },
    //   resolve: (_parent, { id }, ctx:Context) => {
    //     return ctx.prisma.post.update({
    //       where: { id },
    //       data: { published: true },
    //     });
    //   },
    // });

    // t.field('deleteTopic', {
    //   type: 'punbb_topics',
    //   nullable: true,
    //   args: { id: intArg({ nullable: false }) },
    //   resolve: (_parent, { id }, ctx:Context) => {
    //     return ctx.prisma.post.delete({
    //       where: {
    //         id,
    //       },
    //     });
    //   },
    // });
  },
});
