const { Schema, model } = require('mongoose');

const gymSchema = new Schema(
    {
        gymName: {
            type: String,
            required: true,
            trim: true
        },
        gymEmail: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        employees: [
            {
                type: Schema.Types.ObjectId,
<<<<<<< HEAD
                ref: 'Employees'
=======

                ref: 'User'
>>>>>>> c2382ee3d3ca05a350bf59dee896fc6ba787594f
            }
        ],
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Member'
            }
        ]
    }
);
const Gym = model('Gym', gymSchema)
module.exports = Gym