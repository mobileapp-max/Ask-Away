import { gql } from "@apollo/client";

export const QUESTIONS_MUTATION = gql`
mutation ($question: String!, $user_id: String, $email: String) {
    insert_question(
        objects: [{
            question: $question
            user_id: $user_id
            email: $email
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
    delete_response (
      where: {
        question_id: {
          _eq: $id
        }
      }
    ) {
      affected_rows
    }
  } `;


export const ADD_RESPONSE = gql`
mutation ($question_id: uuid, $response_1: Int, $response_2: Int, $user_id: String, $report: Int) {
  insert_response (
    objects: [{
        response_1 : $response_1,
        response_2 : $response_2,
        question_id : $question_id,
        user_id : $user_id,
        report: $report,
      }],
    ) {
      returning {
        question_id
        response_1
        response_2
        id
        user_id
        report
  }
}
} `;
