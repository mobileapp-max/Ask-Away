import { gql } from "@apollo/client";

export const QUESTIONS_SUBSCRIPTION = gql`
subscription MySubscription {
  question {
    question
    id
    answer_1
    answer_2
    created_at
  }
}
`;

