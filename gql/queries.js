import { gql } from "@apollo/client";

export const QUESTIONS_SUBSCRIPTION = gql`
subscription MySubscription {
  question {
    question
    id
    answer_1
    answer_2
    created_at
    user_id
    responses_aggregate {
      aggregate {
        sum {
          response_1
          response_2
        }
      }
    }
  }
}
`;

