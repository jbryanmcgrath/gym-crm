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
export const MUTATION_ADDGYM = gql`mutation addGym($gymName: String!, $gymEmail: String!, $phoneNumber: String!, $address: String!, $city: String!, $zip: String!, $state: String!) {
  addGym(gymName: $gymName, gymEmail: $gymEmail, phoneNumber: $phoneNumber, address: $address, city: $city, zip: $zip, state: $state) {
    gymName
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

export const MUTATION_ADDEMPLOYEE = gql`mutation addEmployee($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
<<<<<<< HEAD
  addEmployee(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    firstName
    lastName
    email
    phoneNumber
  }
}`;
=======
    addEmployee(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      firstName
      lastName
      email
      phoneNumber
    }
  }`;
>>>>>>> b7770af7f0d3b44f0cef56338b17f675bc4b54a3

