const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    gym: {
      type: Schema.Types.ObjectId,
      ref: 'Gym'
    },
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member'
      }
    ],
    admin: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
employeeSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
employeeSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

<<<<<<< HEAD:backend/server/models/Employee.js
employeeSchema.virtual('friendCount').get(function () {
=======
userSchema.virtual('role').get(function () {
  return "User"
});

userSchema.virtual('friendCount').get(function () {
>>>>>>> c2382ee3d3ca05a350bf59dee896fc6ba787594f:backend/server/models/User.js
  return this.friends.length;
});

const Employee = model('Employee', employeeSchema);

module.exports = Employee;
