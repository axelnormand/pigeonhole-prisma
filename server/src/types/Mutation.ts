import { getUserId } from '../auth';
import { Context } from '../context';
import sha1 from 'crypto-js/sha1';
import { sign } from 'jsonwebtoken';
import { intArg, mutationType, nonNull, stringArg } from 'nexus';
import { config } from '../config';
import { LoginResultType } from './types';

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
          const token = sign({ userId: user.id }, config().appSecret ??'');
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
        return { loginResult: LoginResultType.ERROR };
      },
    });

    t.field('updatePushToken', {
      type: 'UpdateResult', 
      args: {
        token: nonNull(stringArg()),
      },
      resolve: async (_parent, { token }, ctx: Context) => {
        const userId = getUserId(ctx);
        if (!userId) throw new Error('Could not find user.');
        console.log(`Saving push token`, { userId, token });
        const user = await ctx.prisma.punbb_user.findUnique({
          where: {
            id: Number(userId),
          },
        });
        if (!user) {
          throw new Error(`user not found with userId ${userId}`)
        }
        const tokens = (user.admin_note ?? '').split(','); 
        if (tokens.indexOf(token) >= 0) {
          //already saved token
          console.log(`Already saved`);
          return { success: false};
        }
        tokens.push(token);
        // get current ones and append new one if it doesnt exist
        ctx.prisma.punbb_user.update({
          data: {
            admin_note: tokens.join(','),
          }, where: {
            id: userId 
          } 
        });
        return {success: true};
      }, 
    });

    t.field('createTopic', {
      type: 'punbb_topic',
      args: {
        forum_id: nonNull(intArg()),
        message: nonNull(stringArg()),
        subject: nonNull(stringArg()),
      },
      resolve: async (_parent, { forum_id, subject, message }, ctx:Context) => {
        const userId = getUserId(ctx);
        if (!userId) throw new Error('Could not find user.');
        const user = await ctx.prisma.punbb_user.findUnique({
          where: {
            id: Number(userId),
          },
        });
        if (!user) {
          throw new Error(`user not found with userId ${userId}`)
        }
        const forum = await ctx.prisma.punbb_forum.findUnique({
          where: {
            id: forum_id,
          },
        });
        if (!forum) {
          throw new Error(`forum not found with forum_id ${forum_id}`)
        }
        const posted = Math.round(Date.now() / 1000); // epoch seconds

        const newTopic = await ctx.prisma.punbb_topic.create({
          data: {
            last_post: posted,
            last_poster: user.username,
            num_replies: 1,
            poster: user.username,
            posted,
            subject,
            forum_id,
            yes: '',
            no: '',
            question:''
          },
        });

        const newPost = await ctx.prisma.punbb_post.create({
          data: {
            message,
            poster_id: userId,
            poster: user.username,
            poster_ip: ctx.request.ip,
            topic_id: newTopic.id,
            posted
          },
        });

        //update forum bits
        await ctx.prisma.punbb_forum.update({
          data: {
            last_post: posted,
            last_post_id: newPost.id,
            last_poster: user.username,
            num_posts: forum.num_posts + 1,
            num_topics: forum.num_topics+1,
          }, where: {
            id: forum.id,
          },
        });
         //update thread with new post id
         await ctx.prisma.punbb_topic.update({
          data: {
            last_post_id: newPost.id,
          }, where: {
            id: newTopic.id,
          },
        });
        return newTopic;
      },
    });

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

    t.field('createPost', {
      type: 'punbb_post',
      args: {
        topic_id: nonNull(intArg()),
        message: nonNull(stringArg()),
      },
      resolve: async (_parent, { message, topic_id }, ctx:Context) => {
        const userId = getUserId(ctx);
        if (!userId) throw new Error('Could not find user.');
        const user = await ctx.prisma.punbb_user.findUnique({
          where: {
            id: Number(userId),
          },
        });
        if (!user) {
          throw new Error(`user not found with userId ${userId}`)
        }
        const topic = await ctx.prisma.punbb_topic.findUnique({
          where: {
            id: topic_id,
          },
        });
        if (!topic) {
          throw new Error(`topic not found with topic_id ${topic_id}`)
        }
        const forum = await ctx.prisma.punbb_forum.findUnique({
          where: {
            id: topic.forum_id,
          },
        });
        if (!forum) {
          throw new Error(`forum not found with forum_id ${topic.forum_id}`)
        }
        const posted = Math.round(Date.now() / 1000); // epoch seconds

        const newPost = await ctx.prisma.punbb_post.create({
          data: {
            message,
            poster_id: userId,
            poster: user.username,
            poster_ip: ctx.request.ip,
            topic_id,
            posted
          },
        });
        //update thread bits
        await ctx.prisma.punbb_topic.update({
          data: {
            last_post: posted,
            last_post_id: newPost.id,
            last_poster: user.username,
            num_replies: topic.num_replies+1,
          }, where: {
            id: topic_id,
          },
        });
        //update forum bits
        await ctx.prisma.punbb_forum.update({
          data: {
            last_post: posted,
            last_post_id: newPost.id,
            last_poster: user.username,
            num_posts: forum.num_posts+1,
          }, where: {
            id: forum.id,
          },
        });
        return newPost;
      },
    });
  },
});
