import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    username: {
        type: String,
        required: [true, 'An unique username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'An unique email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    }
}, {timestamps: true});

export default mongoose.models.User || mongoose.model('User', UserSchema);