const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, default:false},
    isVerified: {type: Boolean, default: false},
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = models.User || model('User', UserSchema)
export default User;
