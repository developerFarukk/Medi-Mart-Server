import { model, Schema } from "mongoose";
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from "./student.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

// User/student Name Schema
const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,  //  trim =>  Extra space remove
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
});

// user Guardian Schema
const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        trim: true,
        required: [true, 'Father Name is required'],
    },
    fatherOccupation: {
        type: String,
        trim: true,
        required: [true, 'Father occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father Contact No is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother Name is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother occupation is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother Contact No is required'],
    },
});

// User Local gardian schema
const localGuradianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    occupation: {
        type: String,
        required: [true, 'Occupation is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
});

// full student schema
const studentSchema = new Schema<TStudent, StudentModel>(
    {
        id: {
            type: String,
            required: [true, 'ID is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            maxlength: [20, 'Password can not be more than 20 characters'],
        },
        // user: {
        //     type: Schema.Types.ObjectId,
        //     required: [true, 'User id is required'],
        //     unique: true,
        //     ref: 'User',
        // },
        name: {
            type: userNameSchema,
            required: [true, 'Name is required'],
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female', 'other'],
                message: '{VALUE} is not a valid gender',
            },   // many or type value inpute use is enum 
            required: [true, 'Gender is required'],
        },
        dateOfBirth: { type: String },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        contactNo: { type: String, required: [true, 'Contact number is required'] },
        emergencyContactNo: {
            type: String,
            required: [true, 'Emergency contact number is required'],
        },
        bloodGroup: {
            type: String,
            enum: {
                values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                message: '{VALUE} is not a valid blood group',
            },
        },
        presentAddress: {
            type: String,
            required: [true, 'Present address is required'],
        },
        permanentAddress: {
            type: String,
            required: [true, 'Permanent address is required'],
        },
        guardian: {
            type: guardianSchema,
            required: [true, 'Guardian information is required'],
        },
        localGuardian: {
            type: localGuradianSchema,
            required: [true, 'Local guardian information is required'],
        },
        profileImg: { type: String },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
        versionKey: false
    },
);

//  virtual হলো Mongoose-এ এমন একটি ফিচার, যা স্কিমার (Schema) প্রপার্টি হিসেবে সংরক্ষণ না করেও একটি ডেরাইভড (derived) ভ্যালু তৈরি করতে দেয়। অর্থাৎ, এটি কোনো ডাটা ডাটাবেজে সংরক্ষণ না করেই একটি ফিল্ড তৈরি করে যা অবজেক্টে অ্যাক্সেস করার সময় পাওয়া যায়।
studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName;
});

// pre save middleware/ hook : will work on create()  save()
studentSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook : we will save  data');
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// Query Middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);




// ********************************************************

// import { Schema, model } from 'mongoose';
// import { Guardian, LocalGuardian, Student, UserName } from './student.interface';


// const userNameSchema = new Schema<UserName>({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     middleName: {
//         type: String,
//     },
//     lastName: {
//         type: String,
//         required: true,
//     },
// });

// const guardianSchema = new Schema<Guardian>({
//     fatherName: {
//         type: String,
//         required: true,
//     },
//     fatherOccupation: {
//         type: String,
//         required: true,
//     },
//     fatherContactNo: {
//         type: String,
//         required: true,
//     },
//     motherName: {
//         type: String,
//         required: true,
//     },
//     motherOccupation: {
//         type: String,
//         required: true,
//     },
//     motherContactNo: {
//         type: String,
//         required: true,
//     },
// });

// const localGuradianSchema = new Schema<LocalGuardian>({
//     name: {
//         type: String,
//         required: true,
//     },
//     occupation: {
//         type: String,
//         required: true,
//     },
//     contactNo: {
//         type: String,
//         required: true,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
// });

// const studentSchema = new Schema<Student>({
//     id: { type: String },
//     name: userNameSchema,
//     gender: ['male', 'female'],
//     dateOfBirth: { type: String },
//     email: { type: String, required: true, unique: true },
//     contactNo: { type: String, required: true },
//     emergencyContactNo: { type: String, required: true },
//     bloogGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//     presentAddress: { type: String, required: true },
//     permanentAddress: { type: String, required: true },
//     guardian: guardianSchema,
//     localGuardian: localGuradianSchema,
//     profileImg: { type: String },
//     isActive: ['active', 'blocked'],
// },
// {
//     timestamps: true,
//     versionKey: false
// });

// export const StudentModel = model<Student>('Student', studentSchema);