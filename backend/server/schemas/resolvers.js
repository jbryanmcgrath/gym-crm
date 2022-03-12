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
        login: async (_, { email, password }) => {
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
        addMember: async (_, args) => {
            const member = await Member.create(args);

            return member;
            console.log('Member was added')
        }
    }
};

module.exports = resolvers;