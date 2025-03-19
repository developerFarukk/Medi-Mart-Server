import { Types } from "mongoose";




export interface TReview {
    id?: Types.ObjectId;
    user: Types.ObjectId;
    product: Types.ObjectId;
    title: string;
    message: string;
    reviewCount: number;
}