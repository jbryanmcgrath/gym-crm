const { Schema, model } = require('mongoose');

const gymSchema = new Schema(
    {
        gymName: {
            type: String,
            required: true,
            trim: true
        },
        ownerFirstName: {
            type: String,
            trim: true
        },
        ownerLastName: {
            type: String,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        gymEmail: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
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
        password: {
            type: String,
            required: true,
            minLength: 8
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