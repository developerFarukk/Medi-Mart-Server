import { TStudent } from "./student.interface";
import { Student } from "./student.model";



// const createStudentIntoDB = async (student: TStudent) => {
//     const result = await StudentModel.create(student);
//     return result;
// };

const createStudentIntoDB = async (studentData: TStudent) => {
    if (await Student.isUserExists(studentData.id)) {
        throw new Error('User already exists!');
    }
    const result = await Student.create(studentData);
    return result;
};

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
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

const updateStudent = async (id: string, data: TStudent) => {
    const result = await Student.findByIdAndUpdate(id, data, {
        new: true,
    })
    return result
}

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    createStudentIntoDB,
    updateStudent
};