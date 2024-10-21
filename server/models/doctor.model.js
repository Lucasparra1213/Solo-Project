import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const doctorSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [4, 'Username must be at least 4 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    name: {
        type: String,
        required: [true, 'Doctor name is required'],
    },
    role: {
        type: String,
        default: 'doctor',
    }
}, { timestamps: true });


doctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Doctor = model('Doctor', doctorSchema);
export default Doctor;