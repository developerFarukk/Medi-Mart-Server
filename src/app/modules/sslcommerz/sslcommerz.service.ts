/* eslint-disable @typescript-eslint/no-unused-vars */



// import express, { Request, Response } from 'express';
import config from "../../config";
import AppError from '../../errors/AppError';
import SSLCommerzPayment from 'sslcommerz-lts';
// import { TPayment } from '../orders/order.interface';
import httpStatus from "http-status";

// const app = express();

const store_id = config.store_id as string;
const store_passwd = config.store_passwd as string;
const is_live = config.is_live as string;

const initPayment = async (
    // payment: TPayment,
    // request: Request, res: Response
    paymentData: { total_amount: number, tran_id: string }
) => {
    const { total_amount, tran_id } = paymentData;

    // const total_amount = payment.amount;
    // const tran_id = payment.transactionId;

    const data = {
        total_amount,
        currency: 'BDT',
        tran_id, // Use unique tran_id for each API call
        success_url: `${config.validation_url}?tran_id=${tran_id}`,
        fail_url: config.failed_url as string,
        cancel_url: config.cancel_url as string,
        ipn_url: 'http://localhost:5001/api/v1/ipn',
        shipping_method: 'Courier',
        product_name: 'N/A.',
        product_category: 'N/A',
        product_profile: 'general',
        cus_name: 'N/A',
        cus_email: 'N/A',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'N/A',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    // console.log("data", data);


    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    // console.log("sslz", sslcz);


    const apiResponse = await sslcz.init(data);
    console.log("api Response", apiResponse);



    // try {
    //     const apiResponse = await sslcz.init(data);

    //     console.log("api response", apiResponse);


    //     // Redirect the user to the payment gateway
    //     // const GatewayPageURL = apiResponse.GatewayPageURL;

    //     // if (GatewayPageURL) {
    //     //     return GatewayPageURL;
    //     // } else {
    //     //     throw new AppError(httpStatus.BAD_GATEWAY, "Failed to generate payment gateway URL.");
    //     // }
    // } catch (error) {
    //     throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "An error occurred while processing payment.");
    // }
};



export const sslService = {
    initPayment,
};