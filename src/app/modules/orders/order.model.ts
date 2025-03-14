


import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User id is required']
    },

    products: [
        {
            medicins: {
                type: Schema.Types.ObjectId,
                ref: "Medicin",
                required: [true, 'Medicin id is required']
            },
            orderQuantity: {
                type: Number,
                required: true,
                min: [1, "Order Quantity  must be at least 1"],
            },
            subTotalPrice: {
                type: Number,
                required: [true, 'Total price is required'],
                min: 0
            },
            _id: false
        },

    ],

    totalQuantity: {
        type: Number,
        required: true,
        min: [1, "Order Quantity  must be at least 1"],
    },

    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "card", "Online"],
        default: "Online",
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    shippingAddress: {
        type: String,
        required: false,
    },

    precriptionImage: {
        type: String,
        required: false,
        default: ""
    },
    payment: {
        transactionId: String,
        paymentMethod: {
            type: String,
            enum: ["Cash", "card", "Online"],
            default: "Online",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        amount: {
            type: Number,
            min: 0,
        },
        gatewayResponse: {
            type: Schema.Types.Mixed,
            default: null,
        },
    },

},
    {
        timestamps: true,
    }

)

const Order = model<TOrder>('Order', orderSchema)
export default Order;