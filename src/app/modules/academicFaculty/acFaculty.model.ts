

import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './acFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    },
);

export const AcademicFaculty = model<TAcademicFaculty>(
    'AcademicFaculty',
    academicFacultySchema,
);