import { gql } from '@apollo/client';

export const MUTATION_INITIALEMPLOYEE = gql`mutation initialEmployee($firstName: String!, $lastName: String!, $email: String!, $password: String!, $phoneNumber: String!) {
    initialEmployee(firstName: $firstName, lastName: $lastName, email: $email, password: $password, phoneNumber: $phoneNumber) {
      token
      employee {
        phoneNumber
        email
        lastName
        firstName
        _id
      }
    }
  }
`
export const MUTATION_ADDGYM = gql`mutation addGym($gymName: String!, $ownerFirstName:STRING!,$ownerLastName:STRING!,$phoneNumber: String!, $gymEmail: String!,  $address: String!, $city: String!, $zip: String!, $state: String!, $password:String!) {
  addGym(gymName: $gymName,          ownerFirstName:$ownerFirstName, ownerLastName:$ownerLastName,
  phoneNumber: $phoneNumber, 
  gymEmail: $gymEmail,  
  address: $address, 
  city: $city, 
  zip: $zip, 
  state: $state
  password:$password) {
      gymName
      ownerFirstName  
      ownerLastName
      phoneNumber
      gymEmail
      address
      city
      zip
      state
      password
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

export const MUTATION_NEWEMPLOYEE = gql`mutation newEmployee($firstName: String!, $lastName: String!, $email: String!,$phoneNumber:String! $password: String!) {
  addEmployee(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber password: $password) {
    firstName
    lastName
    email
    phoneNumber
    password
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