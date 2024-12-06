import { TStudent } from "./student.interface";
import { Student } from "./student.model";



// const createStudentIntoDB = async (student: TStudent) => {
//     const result = await Student.create(student);
//     return result;
// };

// const createStudentIntoDB = async (studentData: TStudent) => {
//     if (await Student.isUserExists(studentData.id)) {
//         throw new Error('User already exists!');
//     }
//     const result = await Student.create(studentData);
//     return result;
// };

const getAllStudentsFromDB = async () => {
    const result = await Student.find().populate('user').populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        }
    })
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findById(id);
    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const result = await Student.findByIdAndDelete(id);
    return result;
};

// const updateStudent = async (id: string, data: TStudent) => {
//     const result = await Student.findByIdAndUpdate(id, data, {
//         new: true,
//     })
//     return result
// }


const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    console.log(modifiedUpdatedData);

    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
};


export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    // createStudentIntoDB,
    // updateStudent
    updateStudentIntoDB
};