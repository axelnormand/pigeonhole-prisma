type Config = {
  appSecret?: string;
  pigeonholeServer: 'lambda' | 'node';
};

/* read process.env known keys */
export const config = (): Config => ({
  appSecret: process.env.APP_SECRET,
  pigeonholeServer:
    process.env.PIGEONHOLE_SERVER === 'lambda' ? 'lambda' : 'node',
});
