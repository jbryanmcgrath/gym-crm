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