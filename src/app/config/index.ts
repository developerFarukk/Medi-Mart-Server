import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    default_password: process.env.DEFAULT_PASS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    // jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    // jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

    sender_email: process.env.SENADER_EMAIL,
    sender_email_password: process.env.SENDER_EMAIL_PASSWORD,


    // ssl Commerz api 
    // store_id: process.env.STORE_ID,
    // store_passwd: process.env.STORE_PASSWORD,
    // is_live: process.env.IS_LIVE,
    // store_name: process.env.STORE_NAME,
    // payment_api: process.env.PAYMENT_API,
    // validation_api: process.env.VALIDATION_API,
    // validation_url: process.env.VALIDATION_URL,
    // success_url: process.env.SUCCESS_URL,
    // failed_url: process.env.FAILED_URL,
    // cancel_url: process.env.CANCEL_URL,
    // ipn_url: process.env.IPN_URL,

    // Surjopay End Point
    sp: {
        sp_endpoint: process.env.SP_ENDPOINT,
        sp_username: process.env.SP_USERNAME,
        sp_password: process.env.SP_PASSWORD,
        sp_prefix: process.env.SP_PREFIX,
        sp_return_url: process.env.SP_RETURN_URL,
    },

};