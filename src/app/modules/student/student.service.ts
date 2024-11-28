
import { Student } from './student.interface';
import { StudentModel } from './student.model';


const createStudentIntoDB = async (student: Student) => {
    const result = await StudentModel.create(student);
    return result;
};

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find();
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findById(id);
    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const result = await StudentModel.findByIdAndDelete(id);
    return result;
};

const updateStudent = async (id: string, data: Student) => {
    const result = await StudentModel.findByIdAndUpdate(id, data, {
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