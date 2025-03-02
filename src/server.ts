
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server | null = null;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('🛢 Database connected successfully');

        server = app.listen(config.port, () => {
            console.log(`app is listening on port ${config.port}`);
        });
    } catch (err) {
        // console.log(err);
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
}

main();

process.on('unhandledRejection', () => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});

// Promise.reject();