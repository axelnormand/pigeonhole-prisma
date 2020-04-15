type Config = {
  appSecret?: string;
  pigeonholeServer: 'lambda' | 'node';
  nodeEnv?: string;
};

/* read process.env known keys */
export const config = (): Config => ({
  appSecret: process.env.APP_SECRET,
  nodeEnv: process.env.NODE_ENV,
  pigeonholeServer:
    process.env.PIGEONHOLE_SERVER === 'lambda' ? 'lambda' : 'node',
});
