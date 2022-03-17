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
`