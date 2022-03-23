const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const newMemberSchema = new Schema({
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
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    phoneNumber: {
        type: String,
        unique: true,
        match: [/^\d{10}$/, "Must match a phone number!"],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    preferredName: {
        type: String,
        required: true,
        trim: true
    },
    assignedTrainer: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    memberActive: {
        type: Boolean
    }
});

const Member = model('Member', newMemberSchema);

module.exports = Member;