const { AuthenticationError } = require("apollo-server-express");
const Member = require("../models/Member");
const User = require("../models/User");
<<<<<<< HEAD
const { signToken } = require('../utils/auth');
=======
const Gym = require("../models/Gym")
>>>>>>> 52df64c09c43cc1cfb45e5324386f4e3538851fe

const resolvers = {
    Query: {
        gym: async (_, { name, addres, city, state, zip, phoneNumber }) => {
            return await Gym.find()
        },
        user: async (_, { email }) => {
            return User.findOne({ email })
                .select('-__v -password')
                .populate('members')
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
            console.log('Login successful!');
            const token = signToken(user);
            return { token, user };
        },
        addMember: async (parent, args, context) => {
            if (context.user) {
                
                const member = await Member.create({ ...args, user_email: context.user.email });
                
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { members: member } },
                    { new: true }
                );
                
                return member;
                }
                throw new AuthenticationError('You need to be logged in!');
            },
        updateMember: async (_, args, context) => {
            if (context.user) {
                const updates = args.updatedEmail ? {
                    ...args,
                    email: args.updatedEmail
                } : { ...args }
                return Member.findOneAndUpdate({ email: args.email }, updates, { new: true })
            }
        },
        deleteMember: async (_, args, context) => {
            if (context.user) {
                const member = await Member.findOneAndDelete(args);
                return member;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;