import { Types } from "mongoose";




export interface TReview {
    id?: Types.ObjectId;
    user: Types.ObjectId;
    prodect: Types.ObjectId;
    title: string;
    message: string;
    reviewCount: number;
}