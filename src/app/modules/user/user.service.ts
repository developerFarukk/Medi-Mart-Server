
// import config from '../../config';
// import { TStudent } from '../student/student.interface';
// import { Student } from '../student/student.model';
// import { TUser } from './user.interface';
// import { User } from './user.model';

// const createStudentIntoDB = async (password: string, studentData: TStudent) => {
//     // create a user object
//     const userData: Partial<TUser> = {};

//     //if password is not given , use deafult password
//     userData.password = password || (config.default_password as string);

//     //set student role
//     userData.role = 'student';

//     //set manually generated it
//     userData.id = '2030100001';

//     // create a user
//     const newUser = await User.create(userData);

//     //create a student
//     if (Object.keys(newUser).length) {
//         // set id , _id as user
//         studentData.id = newUser.id;
//         studentData.user = newUser._id; //reference _id

//         const newStudent = await Student.create(studentData);


//         return newStudent;
//     }
// };

// export const UserServices = {
//     createStudentIntoDB,
// };


import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    try {
        // Create a user object
        const userData: Partial<TUser> = {};

        // If password is not given, use default password
        userData.password = password || (config.default_password as string);

        // Set student role
        userData.role = 'student';

        // Manually generate ID (consider if you need to generate this dynamically)
        userData.id = '2030100001';

        // Create a user
        const newUser = await User.create(userData);

        // Ensure user creation was successful
        if (!newUser || !newUser.id) {
            throw new Error('Failed to create user');
        }

        // Create a student only if user creation was successful
        if (Object.keys(newUser).length) {
            // Set id and _id as user reference for the student
            studentData.id = newUser.id;
            studentData.user = newUser._id; // Reference _id for user

            // Log studentData to ensure it's correct before creating
            console.log('Creating student with data:', studentData);

            const newStudent = await Student.create(studentData);

            // Ensure student creation was successful
            if (!newStudent) {
                throw new Error('Failed to create student');
            }

            return newStudent;
        } else {
            throw new Error('User creation failed');
        }
    } catch (error) {
        console.error('Error creating student into DB:', error.message);
        throw error; // Rethrow to be handled by the controller
    }
};

export const UserServices = {
    createStudentIntoDB,
};
