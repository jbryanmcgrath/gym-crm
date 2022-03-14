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
        gym:Gym
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
        gym(name:String, address:String, city:String, state:String, zip:String, phoneNumber:String): Gym
        user(email: String!): User
        users: [User]
        member(email:String!): Member
        members: [Member]
    }


    type Mutation {
        addGym( name: String!,
        phoneNumber: String!,
        address:String!,
        city:String!,
        zip:String!,
        state:String!): Gym!


        addUser(gym:ID,firstName: String!, lastName: String!,email: String!, password: String!): User!

        login(email:String!, password: String!): User!

        addMember(firstName: String!,lastName: String!, email: String!,
        age: Int, zip: Int, phoneNumber:String!): Member!

        updateMember(firstName: String, lastName:String, email:String, updatedEmail: String, age:Int, zip:Int, phoneNumber:String):Member!

        deleteMember(email:String!): Member
    }
`

//export the typeDefs
module.exports = typeDefs;