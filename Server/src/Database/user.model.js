import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }, 
        DOB: {
            type: Date,
            required: true
        }        
    }, 
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)
