
// User name interface
export type TUserName = {
    firstName: string;
    middleName: string;
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




// ************************************************************************

export type UserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type Student = {
    id: string;
    name: UserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string; // Fixed Typo Here
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked';
    isDeleted: boolean; // Assuming it's in your code
};
