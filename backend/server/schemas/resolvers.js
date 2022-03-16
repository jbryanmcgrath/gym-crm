const { AuthenticationError, AuthorizationError } = require("apollo-server-express");
const Member = require("../models/Member");
const User = require("../models/User");
const { signToken } = require('../utils/auth');
const Gym = require("../models/Gym")

const resolvers = {
    Query: {
        gym: async (parent, { gymName }) => {
            return Gym.findOne({ gymName })
                .select('-__v')
                .populate('users')
                .populate('members')
        },
        user: async (parent, { email }) => {
            return User.findOne({ email })
                .select('-__v -password')
                .populate('clients')
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
        initialUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            
            return { token, user };
        },
        addGym: async (parent, args, context) => {
            if (context.user) {
                const newGym = await Gym.create(args);
                
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { gym: newGym._id } },
                    { new: true }
                )
                
                await Gym.findByIdAndUpdate(
                    { _id: newGym._id },
                    { $push: { users: context.user._id } },
                    { new: true }
                )
                return newGym;
            }
        },
        addUser: async (parent, args, context) => {
            const currentUser = await User.findOne({ _id: context.user._id });
            
            if (currentUser && currentUser.admin) {
                const newUser = await User.create(args);
                
                await Gym.findByIdAndUpdate(
                    { _id: currentUser.gym },
                    { $push: { users: newUser } },
                    { new: true }
                )
                
                await User.findByIdAndUpdate(
                    { _id: newUser._id },
                    { $push: { gym: currentUser.gym } },
                    { new: true }
                )
                
                return newUser;
            } else {
                throw new AuthenticationError('Requires admin access.')
            }
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
                
                const member = await Member.create({ ...args, createdBy: context.user });
                
                await Gym.findByIdAndUpdate(
                    { _id: context.user.gym._id },
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