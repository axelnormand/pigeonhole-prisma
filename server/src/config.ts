type Config = {
  appSecret?: string;
  pigeonholeServer: 'lambda' | 'node';
};

if (!process.env.APP_SECRET) {
  console.error('EMPTY process.env.APP_SECRET');
}

/* read process.env known keys */
export const config = (): Config => ({
  appSecret: process.env.APP_SECRET,
  pigeonholeServer:
    process.env.PIGEONHOLE_SERVER === 'lambda' ? 'lambda' : 'node',
});
