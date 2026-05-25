import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    contact : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ["buyer", "seller"],
        default : "buyer",
    }
});

userSchema.pre("save", async function () {

    // only hash if password modified
    if (!this.isModified("password")) {
        return;
    }

    try {

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        return;

    } catch (error) {
        throw new Error("Error hashing password");
    }

});

// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
