// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://MikeNguyen:orehvd69@geovehicles-ac5js.mongodb.net/test-nodejs?retryWrites=true&w=majority",
    JWT_SECRET: "<insert-jwt-secret>",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/mikenguyen0719/image/upload",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
