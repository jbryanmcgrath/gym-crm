import { gql } from '@apollo/client';

export const QUERY_GYM = gql`
    query gym($phoneNumber:String) {
        gym(phoneNumber: $phoneNumber){
        phoneNumber
        gymEmail
        gymName
        _id
        address
        city
        zip
        state
        }
    }
`;

export const QUERY_MEMBERS = gql`
query Query {
    gymMembers {
        members {
            _id
            firstName
            lastName
            phoneNumber
            createdAt
            preferredName
            email
        }
    }
}
`;

export const QUERY_EMPLOYEES = gql`
    query Query {
        gymEmployees {
            employees {
                _id
                firstName
                lastName
                email
                phoneNumber
                admin
            }
        }
    }
`
export const QUERY_MEMBER = gql`
    query member($id: ID!) {
        member(_id: $id) {
        firstName
        lastName
        email
        phoneNumber
        preferredName
        _id
        }
    }
`