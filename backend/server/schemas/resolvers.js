const { AuthenticationError } = require("apollo-server-express");
const Member = require("../models/Member");
const User = require("../models/User");
const Gym = require("../models/Gym")

const resolvers = {
    Query: {
        gym: async (_, { name, addres, city, state, zip, phoneNumber }) => {
            return await Gym.find()
        },
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
        addGym: async (_, args) => {
            const gym = await Gym.create(args)

            return gym;
        },
        addUser: async (_, args) => {
            const user = await User.create(args);

            return user;
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
            return user;
        },
        addMember: async (_, args) => {
            const member = await Member.create(args);

            return member;
            console.log('Member was added')
        },
        updateMember: async (_, args) => {
            const updates = args.updatedEmail ? {
                ...args,
                email: args.updatedEmail
            } : { ...args }
            return Member.findOneAndUpdate({ email: args.email }, updates, { new: true })
        },
        deleteMember: async (_, { email }) => {
            return Member.findOneAndDelete()
        }

    }
};

module.exports = resolvers;