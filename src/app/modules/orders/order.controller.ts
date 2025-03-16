
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


export const OrderController = {
    createOrder,
};