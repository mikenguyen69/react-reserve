import mongoose from 'mongoose'

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email : {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: false // hide the password to be included when sending the data back to client
    },
    role: {
        type: String,
        require: true,
        default: 'user',
        enum: ["user", "admin", "root"]
    }
}, {
    timestamps: true
})

export default mongoose.models.User || mongoose.model('User', UserSchema)