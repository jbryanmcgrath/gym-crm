//import the gql tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email:String!
    }

    type Member {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        age: Int 
        zip: Int
        phoneNumber: String!
    }

    type Query {
        user(email: String!): User
        users: [User]
        member(email:String!): Member
        members: [Member]
    }


    type Mutation {
        addUser(firstName: String!, lastName: String!,email: String!, password: String!): User

        login(email:String!, password: String!): User

        addMember(firstName: String!,lastName: String!, email: String!,
        age: Int, zip: Int, phoneNumber:String!): Member
    }
`

//export the typeDefs
module.exports = typeDefs;