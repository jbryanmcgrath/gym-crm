//import the gql tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
scalar Date
    type Gym {
        _id:ID
        name: String!
        phoneNumber: String!
        address:String!
        city:String!
        zip:String!
        state:String!
        members:[Member]
    }

    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email:String!
        gym: Gym
        clients: [Member]
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
    }

    type Query {
        gym(phoneNumber:String): Gym
        employee(email: String!): User
        employees: [User]
        member(email:String!): Member
        members(user_email: String): [Member]
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Mutation {
        addUser(firstName: String!, lastName: String!,email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addMember(firstName: String!, lastName: String!, email: String!, age: Int, zip: Int, phoneNumber:String!): Member
        updateMember(firstName: String, lastName: String, email: String, updatedEmail: String, age: Int, zip: Int, phoneNumber: String): Member!
        deleteMember(email: String!): Member
        addGym( name: String!, phoneNumber: String!, address:String!, city:String!, zip:String!, state:String!): Auth
    }
    
`

//export the typeDefs
module.exports = typeDefs;