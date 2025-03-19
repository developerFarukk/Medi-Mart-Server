import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";



const orderSchema = new Schema<TReview>({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User id is required']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Medicin",
        required: [true, 'Medicin id is required']
    },
    
    title: {
        type: String,
        trim: true,
        required: [true, 'Review title is required'],
    },
    message: {
        type: String,
        trim: true,
        required: [true, 'Review  message is required'],
    },
    reviewCount: {
        type: Number,
        required: true,
        min: [1, "Review  count  must be at least 1"],
        max: [5, "Review count maximum at least 5"],
        default: 1
    },

},
    {
        timestamps: true,
    }

)

const Review = model<TReview>('Review', orderSchema)
export default Review;