import dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET
export const mongoDomain = process.env.MONGO_DOMAIN
export const mongoUser = process.env.MONGO_USER
export const mongoPWD = process.env.MONGO_PWD
export const mongoDb = process.env.MONGO_DATABASE


export const firebaseStorage = process.env.Firebase_Storage_bucket
export const googleCredentials= process.env.GOOGLE_APPLICATION_CREDENTIALS