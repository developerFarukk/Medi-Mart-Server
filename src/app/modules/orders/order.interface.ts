
import { Types, Document } from 'mongoose';
// import { IPayment } from '../payment/payment.interface';

export interface TOrderProduct {
    medicins: Types.ObjectId;
    orderQuantity: number;
    subTotalPrice: number;
}

export interface TOrder extends Document {
    user: Types.ObjectId;
    products: TOrderProduct[];
    totalQuantity: number;
    totalPrice: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    shippingAddress: string;
    paymentMethod: 'Cash' | 'Card' | 'Online';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    precriptionImage: string;
    createdAt?: Date;
    updatedAt?: Date;
    // payment?: IPayment | null;
}

