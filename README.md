## Starting Repo for MERN Stack - The Complete Guide

###Setup now.json as following 
```json
{
  "name": "vercel_app_deployment_name",
  "alias": "vercel_app_deployment_name.vercel.app",
  "version": 2,
  "env": {
    "MONGO_SRV": "MONGO_SRV",
    "JWT_SECRET": "JWT_SECRET",
    "CLOUDINARY_URL": "CLOUDINARY_URL",
    "STRIPE_SECRET_KEY": "STRIPE_SECRET_KEY"
  }
}

###setup configure file for next.config.js
```json
// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "MONGO_SRV",
    JWT_SECRET: "JWT_SECRET",
    CLOUDINARY_URL: "CLOUDINARY_URL",
    STRIPE_SECRET_KEY: "STRIPE_SECRET_KEY"
  }
};
