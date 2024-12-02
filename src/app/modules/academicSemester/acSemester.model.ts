import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./acSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./acSemester.constant";


const acdemicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            trim: true,
            require: [true, 'Academic semister name is required'],
            enum: AcademicSemesterName,
        },
        year: {
            type: String,
            trim: true,
            required: [true, "Academic year is required"]
        },
        code: {
            type: String,
            trim: true,
            required: [true, "Academic code is required"],
            enum: AcademicSemesterCode,
        },
        startMonth: {
            type: String,
            required: [true, "Academic start month is required"],
            enum: Months
        },
        endMonth: {
            type: String,
            required: [true, "Academic End Month is Required"],
            enum: Months
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

acdemicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    });

    if (isSemesterExists) {
        throw new Error('Semester is already exists !');
    }
    next();
});

export const AcademicSemester = model<TAcademicSemester>(
    'AcademicSemester',
    acdemicSemesterSchema,
);