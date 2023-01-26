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
                reported_times
                user_id
        }
    }
}`;

// export const DELETE_QUESTION = (id: string) => {
//     return gql(`mutation {
//     delete_question (where: { id: { _eq: "${id}" } }) {
//       affected_rows
//     }
//   } `)
// }

// export const DELETE_QUESTION = gql`
// mutation ($id: Int) {
//     delete_question (
//       where: {
//         id: {
//           _eq: $id
//         }
//       }
//     ) {
//       affected_rows
//     }
//   } `;


export const DELETE_QUESTION = gql`
mutation ($id: uuid) {
    delete_question (
      where: {
        id: {
          _eq: $id
        }
      }
    ) {
      affected_rows
    }
  } `;