import { Model, Types } from "mongoose";

// User name interface
export type TUserName = {
    firstName: string;
    middleName?: string | undefined;
    lastName: string;
};

// Guardian Interface
export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

// Local Guardian Interface
export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

// Student interface
export type TStudent = {
    id: string;
    user: Types.ObjectId;
    // password: string;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    admissionSemester: Types.ObjectId;
    isDeleted: boolean;
    academicDepartment: Types.ObjectId;
};

export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>;
}


