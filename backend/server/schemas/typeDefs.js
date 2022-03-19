//import the gql tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
scalar Date

    type Gym {
        _id:ID
        gymName: String!
        phoneNumber: String!
        gymEmail: String!
        address:String!
        city:String!
        zip:String!
        state:String!
        members:[Member]
        employees: [Employee]
    }

    type Employee {
        _id: ID
        firstName: String!
        lastName: String!
        email:String!
        phoneNumber:String!
        gym: Gym
        clients: [Member]
        admin: Boolean
    }

    type Member {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        age: Int 
        zip: Int
        phoneNumber: String!
        createdBy:String!
        createdAt:Date!
        preferredName: String!
    }

    type Query {
        gym(phoneNumber: String!): Gym
        gyms: [Gym]
        gymMembers: [Member]
        employee(email: String!): Employee
        employees: [Employee]
        member(email:String!): Member
        members: [Member]
    }

    type Auth {
        token: ID!
        employee: Employee
    }
    
    type Mutation {
        initialEmployee(firstName: String!, lastName: String!, email: String!, phoneNumber: String!,password: String!): Auth
        addEmployee(firstName: String!, lastName: String!, email: String!, password: String!): Employee
        login(email: String!, password: String!): Auth
        addMember(firstName: String!, lastName: String!, email: String!, age: Int, zip: Int, phoneNumber:String!, preferredName: String!): Member
        updateMember(firstName: String, lastName: String, email: String, updatedEmail: String, age: Int, zip: Int, phoneNumber: String): Member!
        deleteMember(email: String!): Member
        addGym( gymName: String!, gymEmail: String! phoneNumber: String!, address:String!, city:String!, zip:String!, state:String!): Gym
    }
    
`

//export the typeDefs
module.exports = typeDefs;