import { gql } from "@apollo/client";
// import gql from 'graphql-tag';

export const QUESTIONS_MUTATION = gql`
mutation ($question: String!) {
    insert_question(
        objects: [{
            question: $question
    }]
        ){
            returning {
                question
                id
                created_at
                answer_1
                answer_2
        }
    }
}`;

// export const QUESTIONS_MUTATION = gql`
// mutation {
//     insert_question(objects: [{ question: "Did the mutation work?" }])
//     {
//        returning {
//             question
//             id
//             created_at
//             answer_1
//             answer_2
//         }
//     }
// }`