import { Schema } from "mongoose";
import { string } from "zod";
import { TAcademicSemester } from "./acSemester.interface";


const acdemicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: string,
            require: [true, 'Academic semister name is Require'],
            enum: 

        }
    }
)