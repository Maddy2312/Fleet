import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    fullname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer",
    },
    googleId: {
        type: String,
    }
})

userSchema.pre("save", async function (next) {
  // prevent rehashing on every save
  if (!this.isModified("password")) {
    return;
  }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("user", userSchema);
export default userModel;