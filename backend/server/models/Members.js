const { Schema, model } = require("mongoose");

const signupSchema = new Schema({
  //add auto increment to the id
  // _id: Number,
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  age: {
    type: Number,
    min: 1,
    required: true,
  },
  zip: {
    type: String,
    required: false,
  },
  Phonenumber: {
    type: String,
    unique: true,
    match: [/^\d{10}$/, "Must match a phone number!"],
  },
  toJSON: {
    virtuals: true,
  },
});

// // set up pre-save middleware to create password
// signupSchema.pre('save', async function(next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// // compare the incoming password with the hashed password
// signupSchema.methods.isCorrectPassword = async function(password) {
//   return bcrypt.compare(password, this.password);
// };

// signupSchema.virtual('friendCount').get(function() {
//   return this.friends.length;
// });

// const Signup = model('Signup', signupSchema);

module.exports = Members;
