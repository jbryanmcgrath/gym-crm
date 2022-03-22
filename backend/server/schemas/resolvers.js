const { AuthenticationError, AuthorizationError } = require("apollo-server-express");
const Member = require("../models/Member");
const Employee = require("../models/Employee");
const { signToken } = require('../utils/auth');
const Gym = require("../models/Gym")
const Owner = require("../models/Owner")

const resolvers = {
    Query: {
        gym: async (parent, { phoneNumber }) => {
            return Gym.findOne({ phoneNumber })
                .select('-__v')
                .populate('employees')
                .populate('members')
                .populate('owner')
        },
        employee: async (parent, { email }) => {
            return Employee.findOne({ email })
                .select('-__v -password')
                .populate('clients')
                .populate('gym')
        },
        gymMembers: async (parent, args, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            if (currentEmployee.gym) {
                const gym = await Gym.findOne({ _id: currentEmployee.gym })
                return Gym.findOne({ _id: gym._id })
                    .select('-__v')
                    .populate('members')
            }
        },
        employees: async () => {
            return Employee.find()
        },
        member: async (_, { email }) => {
            return Member.findOne({ email })
        },
        members: async () => {
            return Member.find()
        },
    },

    Mutation: {
        owner: async (parent, args) => {
            const owner = await Employee.create({...args, owner: true });
            const token = signToken(owner);

            return { token, owner };
        },
        addGym: async (parent, args, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            if (currentEmployee.owner) {
                const newGym = await Gym.create({ ...args, owner: currentEmployee._id });

                await Employee.findByIdAndUpdate(
                    { _id: context.employee._id },
                    { $push: { gym: newGym._id } },
                    { new: true }
                )

                await Gym.findByIdAndUpdate(
                    { _id: newGym._id },
                    { $push: { employees: currentEmployee._id } },
                    { new: true }
                )


                return newGym;
            }
        },
        newEmployee: async (parent, args, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            console.log(currentEmployee);

            if (currentEmployee && currentEmployee.admin) {
                const newEmployee = await Employee.create(args);

                await Gym.findByIdAndUpdate(
                    { _id: currentEmployee.gym },
                    { $push: { employees: newEmployee } },
                    { new: true }
                )

                await Employee.findByIdAndUpdate(
                    { _id: newEmployee._id },
                    { $push: { gym: currentEmployee.gym } },
                    { new: true }
                )

                return newEmployee;
            } else {
                throw new AuthenticationError('Requires admin access.')
            }
        },
        login: async (parent, { email, password }) => {
            const employee = await Employee.findOne({ email });
            if (!employee) {
                throw new AuthenticationError('Incorrect Credentials Provided')
            }

            const correctPw = await employee.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials Provided')
            }
            console.log('Login successful!');
            const token = signToken(employee);
            return { token, employee };
        },
        addMember: async (parent, args, context) => {

            const currentEmployee = await Employee.findOne({ _id: context.employee._id });

            if (currentEmployee) {


                const member = await Member.create({ ...args, createdBy: currentEmployee });

                await Gym.findByIdAndUpdate(
                    { _id: currentEmployee.gym },
                    { $push: { members: member } },
                    { new: true }
                );

                return member;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateMember: async (_, args, context) => {
            if (context.employee) {
                const updates = args.updatedEmail ? {
                    ...args,
                    email: args.updatedEmail
                } : { ...args }
                return Member.findOneAndUpdate({ email: args.email }, updates, { new: true })
            }
        },
        deleteMember: async (_, args, context) => {
            if (context.employee) {
                const member = await Member.findOneAndDelete(args);
                return member;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;