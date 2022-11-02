const getMongoConfig = () => {
  const environment = process.env.ENV as string;
  let url = '';
  if (environment == 'production') {
    url = process.env.DATABASE_URL_PROD as string;
  } else if (environment == 'staging') {
    url = process.env.DATABASE_URL_STAGING as string;
  } else {
    url = process.env.DATABASE_URL_DEV as string;
  }
  return url;
};

export default getMongoConfig;