const { AuthenticationError, AuthorizationError } = require("apollo-server-express");
const Member = require("../models/Member");
const Employee = require("../models/Employee");
const { signToken } = require('../utils/auth');
const Gym = require("../models/Gym")
const Owner = require("../models/Owner")

const resolvers = {
    Query: {
        gym: async (parent, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            if (currentEmployee.gym) {
                return Gym.findOne({ _id: currentEmployee.gym })
                    .select('-__v')
                    .populate('employees')
                    .populate('members')
                    .populate('owner')
            }
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
                return Gym.findOne({ _id: gym })
                    .select('-__v')
                    .populate('members')
            }
        },
        gymEmployees: async (parent, args, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            if (currentEmployee.gym) {
                const gym = await Gym.findOne({ _id: currentEmployee.gym })
                return Gym.findOne({ _id: gym })
                    .select('-__v')
                    .populate('employees')
            }
        },
        employees: async () => {
            return Employee.find()
        },
        member: async (_, { _id }) => {
            return Member.findOne({ _id })
        },
        members: async () => {
            return Member.find()
        },
    },

    Mutation: {
        owner: async (parent, args) => {
            const owner = await Employee.create({ ...args, owner: true });
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
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            if (currentEmployee) {
                return Member.findOneAndUpdate({ _id: args._id }, args, { new: true })
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteMember: async (_, args, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            if (currentEmployee) {
                const member = await Member.findOneAndDelete({ _id: args._id });
                return member;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateEmployee: async (_, args, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            if (currentEmployee && currentEmployee.admin) {
                return Member.findOneAndUpdate({ _id: args._id }, args, { new: true });
            }
            throw new AuthenticationError('You need to be an admin to perform this task!');
        },
        deleteEmployee: async (_, args, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });
            if (currentEmployee && currentEmployee.admin) {
                const employee = await Employee.findOneAndDelete({ _id: args._id });
                return employee;
            }
            throw new AuthenticationError('You need to be an admin to perform this task!');
        },
        updateGym: async (parent, args, context) => {
            const currentEmployee = await Employee.findOne({ _id: context.employee._id });

            if (currentEmployee && currentEmployee.gym) {
                const gym = currentEmployee.gym
                const updates = { ...args, _id: gym }

                return Gym.findOneAndUpdate({ _id: gym }, updates, { new: true })
            }
        }
    }
};

module.exports = resolvers;