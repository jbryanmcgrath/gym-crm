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
                ref: 'Employee'
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