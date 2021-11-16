const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email address must be valid"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must have at least 6 characters"],
  },
  codeSnippets: [{
    type: Schema.Types.ObjectId,
    ref: 'Snippet',
  }],
});

// Pre-middleware to hash passwords before they are saved to the database.
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Add method to user schema to compare password with stored password using bcrypt
userSchema.methods.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
