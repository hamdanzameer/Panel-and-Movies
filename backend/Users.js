const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmpassword: { type: String }, // Although typically you wouldn't store the confirmation password
  balance: { type: Number, default: 0 },
  accountStatus: { type: String, default: "active" },
  userid: { type: String, default: uuidv4, unique: true },
  orders: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId },
      categoryId: { type: mongoose.Schema.Types.ObjectId },
      serviceId: { type: mongoose.Schema.Types.ObjectId }, // Corrected typo
      amount: { type: Number },
      charged: { type: Number },
      link: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("users", userSchema);
module.exports = User;
