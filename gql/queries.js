import { gql } from "@apollo/client";

export const QUESTIONS_QUERY = gql`
query MyQuery {
  question {
    question
    id
    answer_1
    answer_2
    created_at
  }
}
`;

