import mongoose, {Schema, model} from 'mongoose';

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true   // if we want to enable optimized search
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,   // cloudinary url
        required: true,
    },
    coverImage:{
        type: String,  // cloudinary url
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true});

export const User = model('User', userSchema)