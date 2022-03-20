//import the gql tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
scalar Date

    type Gym {
        _id:ID
        gymName: String!
        ownerFirstName: String
        ownerLastName: String
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
        phoneNumber: String!
        preferredName: String!
        createdBy:String!
        createdAt:Date!
        
    }

    type Query {
        gym(phoneNumber: String!): Gym
        gyms: [Gym]
        gymMembers: Gym
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


        newEmployee(firstName: String!, 
        lastName: String!, 
        email: String!,
        phoneNumber:String! 
        password: String!): Employee


        login(email: String!, password: String!): Auth


        addMember(firstName: String!, 
        lastName: String!, 
        email: String!, 
        phoneNumber:String!, 
        preferredName: String!): Member


        updateMember(firstName: String, lastName: String, email: String, updatedEmail: String, age: Int, zip: Int, phoneNumber: String): Member!


        deleteMember(email: String!): Member


        addGym( gymName: String!,
            ownerFirstName: String!, 
            ownerLastName: String!,
            gymEmail: String!,
            phoneNumber: String!, 
            address:String!, 
            city:String!, 
            zip:String!, 
            state:String!,
            password:String! ): Gym
    }
    
`

//export the typeDefs
module.exports = typeDefs;