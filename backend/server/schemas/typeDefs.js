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
<<<<<<< HEAD
        members: [Member]
=======
        gym:Gym
>>>>>>> 52df64c09c43cc1cfb45e5324386f4e3538851fe
    }

    type Member {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        age: Int 
        zip: Int
        phoneNumber: String!
<<<<<<< HEAD
        user_email: String!
=======
        createdBy:String!
        createdAt:Date!

>>>>>>> 52df64c09c43cc1cfb45e5324386f4e3538851fe
    }

    type Query {
        gym(name:String, address:String, city:String, state:String, zip:String, phoneNumber:String): Gym
        user(email: String!): User
        users: [User]
        member(email:String!): Member
        members(user_email: String): [Member]
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Mutation {
<<<<<<< HEAD
        addUser(firstName: String!, lastName: String!,email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addMember(firstName: String!, lastName: String!, email: String!, age: Int, zip: Int, phoneNumber:String!): Member
        updateMember(firstName: String, lastName: String, email: String, updatedEmail: String, age: Int, zip: Int, phoneNumber: String):Member!
        deleteMember(email: String!): Member
=======
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
>>>>>>> 52df64c09c43cc1cfb45e5324386f4e3538851fe
    }

    
`

//export the typeDefs
module.exports = typeDefs;