
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    // Create a user object
    const userData: Partial<TUser> = {};

    // If password is not given, use default password
    userData.password = password || (config.default_password as string);

    // Set student role
    userData.role = 'student';

    // Manually generate ID (consider if you need to generate this dynamically)
    userData.id = '2030100009';

    // Create a user
    const newUser = await User.create(userData);

    // Ensure user creation was successful
    if (!newUser || !newUser.id) {
        throw new Error('Failed to create user');
    }

    // Create a student only if user creation was successful
    if (Object.keys(newUser).length) {

        studentData.id = newUser.id;
        studentData.user = newUser._id; // Reference _id for user
        // studentData.password = password;

        // console.log('Creating student with data:', studentData);

        const newStudent = await Student.create(studentData);

        // Ensure student creation was successful
        if (!newStudent) {
            throw new Error('Failed to create student');
        }

        return newStudent;
    } else {
        throw new Error('User creation failed');
    }

};

export const UserServices = {
    createStudentIntoDB,
};
