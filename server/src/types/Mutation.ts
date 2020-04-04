import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { mutationType, stringArg, intArg } from 'nexus';
import { getUserId } from '../utils';
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
        username: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { username, password }, ctx) => {
        const user = await ctx.prisma.punbb_users.findOne({
          where: {
            username,
          },
        });
        if (!user) {
          throw new Error(`No username found: ${username}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: sign({ userId: user.id }, config().appSecret),
          user,
        };
      },
    });

    t.field('createThread', {
      type: 'Thread',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
      },
      resolve: (_parent, { title, content }, ctx) => {
        const userId = getUserId(ctx);
        if (!userId) throw new Error('Could not authenticate user.');
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: { connect: { id: Number(userId) } },
          },
        });
      },
    });

    t.field('updateThread', {
      type: 'Thread',
      nullable: true,
      args: { id: intArg() },
      resolve: (_parent, { id }, ctx) => {
        return ctx.prisma.post.update({
          where: { id },
          data: { published: true },
        });
      },
    });

    t.field('deleteThread', {
      type: 'Thread',
      nullable: true,
      args: { id: intArg({ nullable: false }) },
      resolve: (_parent, { id }, ctx) => {
        return ctx.prisma.post.delete({
          where: {
            id,
          },
        });
      },
    });

    t.field('createPost', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
      },
      resolve: (_parent, { title, content }, ctx) => {
        const userId = getUserId(ctx);
        if (!userId) throw new Error('Could not authenticate user.');
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: { connect: { id: Number(userId) } },
          },
        });
      },
    });

    t.field('updatePost', {
      type: 'Post',
      nullable: true,
      args: { id: intArg() },
      resolve: (_parent, { id }, ctx) => {
        return ctx.prisma.post.update({
          where: { id },
          data: { published: true },
        });
      },
    });

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: intArg({ nullable: false }) },
      resolve: (_parent, { id }, ctx) => {
        return ctx.prisma.post.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
