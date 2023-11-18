export default {
    jwt: {
        secret: process.env.JWT_SECRET,
      },
    admin: {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
    email: {
      username: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    }
};