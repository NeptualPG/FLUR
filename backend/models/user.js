const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  email: {
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String, 
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

//password 
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }catch(err){
    next(err)
  }
});

userSchema.methods.comparePassword = async function(candidatePassword){
  return await bcrypt.compare( candidatePassword, this.password);
};



module.exports = mongoose.model('User', userSchema);