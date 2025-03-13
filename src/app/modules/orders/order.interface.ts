
import { Types, Document } from 'mongoose';
// import { IPayment } from '../payment/payment.interface';

export interface TOrderProduct {
    medicins: Types.ObjectId;
    totalQuantity: number;
    totalPrice: number;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    products: TOrderProduct[];
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    shippingAddress: string;
    paymentMethod: 'Cash' | 'Card' | 'Online';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    createdAt?: Date;
    updatedAt?: Date;
    // payment?: IPayment | null;
}

