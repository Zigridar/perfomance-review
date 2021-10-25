import mongoose from 'mongoose';

/**
 * initialize db connection
 * */
export const dbConnect = async (uri: string) => {
  /** db connection **/
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, (err) => {
    if (!err)
      console.info(`connect to mongo on ${uri}`);
    else
      throw err;
  });
};