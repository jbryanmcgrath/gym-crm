import { gql } from '@apollo/client';


export const MUTATION_OWNER = gql`mutation owner($firstName: String!, $lastName: String!, $email: String!, $phoneNumber: String!, $password: String!) {
  owner(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, password: $password) {
    token
  }
}`;

export const MUTATION_GYMINFO = gql`
mutation addGym($gymName: String!, $address: String!, $city: String!, $zip: String!, $state: String!) {
  addGym(gymName: $gymName, address: $address, city: $city, zip: $zip, state: $state) {
    _id
    gymName
    address
    city
    zip
    state
  }
}`;

export const MUTATION_LOGIN = gql`mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    employee {
      _id
      email
    }
  }
}`;

export const MUTATION_NEWEMPLOYEE = gql`mutation newEmployee($firstName: String!, $lastName: String!, $email: String!, $phoneNumber: String!, $password: String!, $admin: Boolean) {
  newEmployee(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, password: $password, admin: $admin) {
    _id
    firstName
    lastName
    email
    phoneNumber
    admin
  }
}`;

export const MUTATION_ADDMEMBER = gql`mutation addMember($firstName: String!, $lastName: String!, $email: String!, $phoneNumber:String!,$preferredName: String!) {
  addMember(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, preferredName:$preferredName) {
    firstName
    lastName
    email
    phoneNumber
    preferredName
  }
}`;


export const MUTATION_MEMBERCOUNT = gql`mutation memberCount($memberCount: Number) {
  updateGym(memberCount: $memberCount) {
    memberCount
  }
}`;