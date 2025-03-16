
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";
import { TJwtPayload } from "../auth/auth.interface";


// Creat Order Function
const createOrder = catchAsync(async (req: Request, res: Response) => {

    // const userId = req.user?.userId
    const user = req.user

    const result = await OrderService.createOrderIntoDB(
        req.body,
        user as TJwtPayload,
        req.ip!
    );
    // console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order is created succesfully',
        data: result,
    });
});


// Veryfy payment
const verifyPayment = catchAsync(async (req, res) => {

    const order = await OrderService.verifyPayment(req.query.order_id as string);;


    // const result = await OrderService.createOrderIntoDB(req.body, user, req.ip!);
    // console.log(result);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order verify succesfully',
        data: order,
    });
});


// get All order 
const getAllOrder = catchAsync(async (req, res) => {

    const result = await OrderService.getAllOrderFromDB(req.query);
    // const result = await OrderService.getAllOrderFromDB();
    // console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Order get successfully',
        // meta: result?.meta,
        // data: result?.result,
        data: result
    });
});


// get me order 
const getMeOrder = catchAsync(async (req, res) => {

    const userEmail = req.user?.email
    // console.log(user);

    const result = await OrderService.getMeOrderFromDB(req.query, userEmail);
    // console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My All Order get successfully',
        // meta: result?.meta,
        // data: result?.result,
        data: result
    });
});


export const OrderController = {
    createOrder,
    verifyPayment,
    getAllOrder,
    getMeOrder
};