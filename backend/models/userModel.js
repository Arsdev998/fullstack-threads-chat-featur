import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    minLenght: 6,
    require: true,
  },
  profilePict: {
    type: String,
    default: "",
  },
  followers: {
    type: [String],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  bio:{
    type: String,
    default:''
  }
},{
    timestamps:true
});


const User = mongoose.model('User',userSchema);

export default User