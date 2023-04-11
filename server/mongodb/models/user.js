import mongoose from "mongoose";

const User = new mongoose.Schema(
        {
        name: {
            type:String, 
            required : [true, 'Please add a name']
        },
        email: {
            type: String, 
            required: [true,'Please add a email'],
            unique: true
        },
        password: {
            type:String, 
            required : [true, 'Please add a password']
        },
        
    },
    {
        timestamps : true
    }
);

const UserSchema = mongoose.model('User', User);

export default UserSchema;

