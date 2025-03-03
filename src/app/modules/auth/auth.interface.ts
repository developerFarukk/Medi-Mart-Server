
import { UserRole } from "../user/user.interface";

export interface TAuth {
    email: string;
    password: string;
}

export interface TJwtPayload {
    userId: string;
    name: string;
    email: string;
    role: UserRole;
}