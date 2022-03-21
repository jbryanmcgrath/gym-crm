const { AuthenticationError, AuthorizationError } = require("apollo-server-express");
const Member = require("../models/Member");
const Employee = require("../models/Employee");
const { signToken } = require('../utils/auth');
const Gym = require("../models/Gym")

const resolvers = {
    Query: {
        gym: async (parent, { phoneNumber }) => {
            return Gym.findOne({ phoneNumber })
                .select('-__v')
                .populate('employees')
                .populate('members')
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

        // to find memberActive that have a 'true' boolean, as in they are AT the gym
        members: async ({ memberActive }) => {
            return Member.find({ memberActive : true})
        },
    },

    Mutation: {
        initialEmployee: async (parent, args) => {
            const employee = await Employee.create(args);
            const token = signToken(employee);

            return { token, employee };
        },
        addGym: async (parent, args, context) => {
            const gym = await Gym.create(args)

            return { gym }
            // if (currentEmployee) {
            //     const newGym = await Gym.create({ ...args, ownerFirstName: currentEmployee.firstName, ownerLastName: currentEmployee.lastName });

            //     await Employee.findByIdAndUpdate(
            //         { _id: context.employee._id },
            //         { $push: { gym: newGym._id } },
            //         { new: true }
            //     )

            //     await Gym.findByIdAndUpdate(
            //         { _id: newGym._id },
            //         { $push: { employees: currentEmployee._id } },
            //         { new: true }
            //     )
            //     return newGym;
            // }
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
        },
        // member sign in at gym. will be a boolean. true = member is AT the gym, until 'false'
        memberIsActive: async (  ) => {
            if (context.member) {
                // function here
            }
        }
    }
};

module.exports = resolvers;