
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = 500;
    let message = 'Something went to be wrong!';

    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err
        // error: err,
    });
};

export default globalErrorHandler;

