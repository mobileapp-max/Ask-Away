import { gql } from "@apollo/client";

export const QUESTIONS_QUERY = gql`
query MyQuery {
  question {
    question
    id
  }
}
`;
