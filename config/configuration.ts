export default {
    database: {
        type: process.env.DB_TYPE,
      },
      jwt: {
        secret: process.env.JWT_SECRET,
      },
};