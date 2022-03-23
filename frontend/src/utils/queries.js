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