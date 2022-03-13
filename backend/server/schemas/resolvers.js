const { AuthenticationError } = require("apollo-server-express");
const Member = require("../models/Member");
const User = require("../models/User");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (_, { email }) => {
            return User.findOne({ email })
        },
        users: async () => {
            return User.find()
        },
        member: async (_, { email }) => {
            return Member.findOne({ email })
        },
        members: async () => {
            return Member.find()
        },
    },

    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
            console.log(`User was added`);
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials Provided')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials Provided')
            }

            const token = signToken(user);
            return { token, user };
        },
        addMember: async (_, args, context) => {
            if (context.user) {
                const member = await Member.create({ ...args, user: context.user.email });
                
                // await User.findByIdAndUpdate(
                //     { _id: context.user._id },
                //     { $push: { member: member._id } },
                //     { new: true }
                // )
                
                return member;
            }
            
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;