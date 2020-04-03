type Config = {
  appSecret?: string;
};

/* read process.env known keys */
export const config = (): Config => ({
  appSecret: process.env.APP_SECRET,
});
