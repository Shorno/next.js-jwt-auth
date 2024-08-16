import mongoose from "mongoose";

declare global {
    var mongoose: any;
}

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set. Please define database connection string in environment variable file");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}

export const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log(`Database connection successful.\nConnection host: ${mongoose.connection.host}`);
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}
