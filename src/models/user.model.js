import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
          },
          password: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
          },
          refreshToken: {
            type: String,
          },
    },
    {timestamps: true}
);


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

 try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
} catch(err) {
    next(err);
}
})

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}


const User = mongoose.model ('User', userSchema);
export default User;