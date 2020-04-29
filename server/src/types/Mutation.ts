import sha1 from 'crypto-js/sha1';
import { sign } from 'jsonwebtoken';
import { mutationType, stringArg } from '@nexus/schema';
import { config } from '../config';

export const Mutation = mutationType({
  definition(t) {
    // t.field('signup', {
    //   type: 'AuthPayload',
    //   args: {
    //     name: stringArg(),
    //     email: stringArg({ nullable: false }),
    //     password: stringArg({ nullable: false }),
    //   },
    //   resolve: async (_parent, { name, email, password }, ctx) => {
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
        username: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (_parent, { username, password }, ctx) => {
        const lowerUsername = username.toLowerCase();
        const users = await ctx.prisma.punbb_user.findMany({
          where: {
            OR: [{ username: lowerUsername }, { email: lowerUsername }],
          },
        });
        if (!users || !users.length) {
          throw new Error(`No username/email found: ${username}`);
        }
        if (users.length > 1) {
          throw new Error(`Multiple usernames/emails found: ${username}`);
        }
        const user = users[0];

        const passwordValid = sha1(password).toString() === user.password;
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          success: true,
          token: sign({ userId: user.id }, config().appSecret),
        };
      },
    });

    // t.field('createTopic', {
    //   type: 'punbb_topics',
    //   args: {
    //     subject: stringArg({ required: true }),
    //   },
    //   resolve: (_parent, { title, content }, ctx) => {
    //     const userId = getUserId(ctx);
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
    //   resolve: (_parent, { id }, ctx) => {
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
    //   resolve: (_parent, { id }, ctx) => {
    //     return ctx.prisma.post.delete({
    //       where: {
    //         id,
    //       },
    //     });
    //   },
    // });
  },
});
