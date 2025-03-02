

export interface TUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customers';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    address: string;
};