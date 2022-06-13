import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  userName: String,
  currentValue: Number,
  USDHeld: Number,
  coinsHeld: Object,
  userId: Number,
  time: { type: Date, default: Date.now },
});

const User = models.userSchema;

export default User;
