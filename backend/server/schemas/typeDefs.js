//import the gql tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
scalar Date
    type Owner {
        _id:ID
        firstName:String!
        lastName:String!
        email:String!
        phoneNumber:String!
        password:String!
        gym:Gym
        admin:Boolean!
    }
    
    type Gym {
        _id:ID
        gymName: String!
        address:String!
        city:String!
        zip:String!
        state:String!
        owner:Owner
        members:[Member]
        employees: [Employee]
        memberCount: Int
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
        memberActive: Boolean
    }

    type Query {
        gym: Gym
        gyms: [Gym]
        gymMembers: Gym
        gymEmployees: Gym
        employee(email: String!): Employee
        employees: [Employee]
        member(_id:ID!): Member
        members: [Member]
        memberActive: Gym
        owner(phoneNumber: String!): Gym
    }

    type Auth {
        token: ID!
        employee: Employee
    }

    type Mutation {
        owner(firstName: String!, lastName: String!, email: String!, phoneNumber: String!,password: String!): Auth

        newEmployee(firstName: String!, 
        lastName: String!, 
        email: String!,
        phoneNumber:String! 
        password: String!,
        admin: Boolean): Employee

        ownerLogin(email:String!, password:String!):Auth
        login(email: String!, password: String!): Auth

        addMember(firstName: String!, 
        lastName: String!, 
        email: String!, 
        phoneNumber:String!, 
        preferredName: String!): Member

        updateMember(_id:ID!, firstName: String, lastName: String, email: String, phoneNumber: String, preferredName: String): Member!

        deleteMember(_id: ID): Member

        updateEmployee(_id: ID!, firstName: String, lastName: String, email: String, phoneNumber: String): Employee!

        deleteEmployee(_id: ID): Employee

        memberIsActive(memberActive: Boolean): Member

        updateGym(memberCount: Int): Gym

        addGym( gymName: String!, 
            address:String!, 
            city:String!, 
            zip:String!, 
            state:String! ): Gym
    } 
`

// export the typeDefs
module.exports = typeDefs;