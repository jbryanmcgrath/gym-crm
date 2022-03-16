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
        users: [User]
    }

    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email:String!
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
    }

    type Query {
        gym(gymName: String!): Gym
        gyms: [Gym]
        user(email: String!): User
        users: [User]
        member(email:String!): Member
        members: [Member]
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Mutation {
        initialUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addMember(firstName: String!, lastName: String!, email: String!, age: Int, zip: Int, phoneNumber:String!): Member
        updateMember(firstName: String, lastName: String, email: String, updatedEmail: String, age: Int, zip: Int, phoneNumber: String): Member!
        deleteMember(email: String!): Member
        addGym( gymName: String!, gymEmail: String! phoneNumber: String!, address:String!, city:String!, zip:String!, state:String!): Gym
    }
    
`

//export the typeDefs
module.exports = typeDefs;