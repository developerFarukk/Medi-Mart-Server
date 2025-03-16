
import { Types, Document } from 'mongoose';
import { TMedicine } from '../medicines/medicine.interface';
// import { TPayment } from '../payment/payment.interface';

export interface TOrderProduct {
    medicins: Types.ObjectId | TMedicine;
    orderQuantity: number;
    subTotalPrice: number;
}

export interface TUserr {
    userId: Types.ObjectId
    name: string;
    email: string;
    number: string;
}


// export interface TPayment {
//     transactionId?: string;
//     paymentMethod: 'Cash' | 'Card' | 'Online';
//     paymentStatus: 'Pending' | 'Paid' | 'Failed';
//     amount: number;
//     gatewayResponse?: Record<string, any>;
// }

export interface TOrder extends Document {
    // user: Types.ObjectId;
    user: TUserr;
    products: TOrderProduct[];
    totalQuantity: number;
    totalPrice: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentMethod: 'Cash' | 'Online';
    paymentStatus: 'Pending' | 'Paid' | 'Cancelled';
    shippingAddress: string;
    precriptionImage: string;
    city: string;
    createdAt?: Date;
    updatedAt?: Date;
    tranjectionId?: string;
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    // payment?: TPayment | null;
}



// export interface TOrderPopulated extends TOrder {
//     user: TUserr & { users: TUser };
//     products: (Omit<TOrderProduct, 'medicins'> & { medicins: TMedicine })[];
// }
