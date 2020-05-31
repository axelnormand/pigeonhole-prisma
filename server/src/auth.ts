import { verify } from 'jsonwebtoken';
import { Context } from './context';
import { config } from './config';

interface Token {
  userId: string;
}

export function getUserId(context: Context): number | null {
  try {
    const { appSecret } = config();
    if (!appSecret) {
      throw new Error('process.env.APP_SECRET is blank');
    }

    let authorization: string;
    if (config().pigeonholeServer === 'lambda') {
      //netlify stores auth token in different place in request
      // @ts-ignore no event in context
      authorization = context.event.headers.authorization;
    } else {
      authorization = context.request.get('Authorization');
    }

    if (!authorization) {
      console.log('No Authorization in header. Context: ', context);
      return null;
    }

    const token = authorization.replace('Bearer ', '');

    const verifiedToken = verify(token, appSecret) as Token;
    const userId = parseInt(verifiedToken.userId);

    if (!verifiedToken || isNaN(userId)) {
      return null;
    }
    return userId;
  } catch (e) {
    console.error(`Error getUserId: ${e.message}`, e, context);
    return null;
  }
}
