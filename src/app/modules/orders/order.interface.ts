
import { Types, Document } from 'mongoose';
import { TPayment } from '../payment/payment.interface';

export interface TOrderProduct {
    medicins: Types.ObjectId;
    orderQuantity: number;
    subTotalPrice: number;
}


// export interface TPayment {
//     transactionId?: string;
//     paymentMethod: 'Cash' | 'Card' | 'Online';
//     paymentStatus: 'Pending' | 'Paid' | 'Failed';
//     amount: number;
//     gatewayResponse?: Record<string, any>;
// }

export interface TOrder extends Document {
    user: Types.ObjectId;
    products: TOrderProduct[];
    totalQuantity: number;
    totalPrice: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentMethod: 'Cash' | 'Card' | 'Online';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    shippingAddress: string;
    precriptionImage: string;
    createdAt?: Date;
    updatedAt?: Date;
    payment?: TPayment | null;
}

