import mongoose, { Mongoose } from 'mongoose';

interface Cached {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongoose: Cached | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached!.promise = mongoose.connect(process.env.DB_URL || '', opts).then((mongoose) => {
            const connection = mongoose.connection;

            connection.on('connected', () => {
                console.log('MongoDb connected successfully');
            });

            connection.on('error', (err) => {
                console.log('MongoDb connection error. Please make sure MongoDB is running. Error: ', err);
            });

            return mongoose;
        }).catch((error) => {
            console.log("Connection with DB failed");
            console.error(error);
            throw error;  // Добавьте эту строку
        });

    }

    cached!.conn = await cached!.promise;

    return cached!.conn;
}
