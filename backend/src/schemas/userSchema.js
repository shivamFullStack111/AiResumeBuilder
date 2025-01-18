const mongoose =require( "mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type: String,
    required: true,
  },
  creadits: {
    type: Number,
    default: 2,
  },
  plan: {
    type: String,
    required: true,
    default: "free",
  },
});

const Users = mongoose.model("Users", userSchema);
module.exports = { Users };
