import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [

    "PORT",

    "MONGODB_URI",

    "JWT_ACCESS_SECRET",

    "JWT_REFRESH_SECRET",

    "BREVO_API_KEY",

    "BASE_URL",

    "REDIS_URL",

];

for (const key of requiredEnv) {

    if (!process.env[key]) {

        throw new Error(

            `Missing environment variable: ${key}`

        );

    }

}

export default process.env;