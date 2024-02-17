import { useSubscription } from "@apollo/client";
import * as React from "react";
import { useState, useCallback, useContext, useMemo, useEffect } from "react";
import { createContext } from "react";
import { useMutation } from "@apollo/client";
import { QUESTIONS_SUBSCRIPTION, RESPONSE_SUBSCRIPTION } from "../gql/queries";
import {
  QUESTIONS_MUTATION,
  DELETE_QUESTION,
  ADD_RESPONSE,
} from "../gql/mutations";
import { UserContext } from "../contexts/user-context-provider";
import { Keyboard } from "react-native";

export const QuestionsContext = createContext({
  questions: [],
  userQuestions: [],
  userResponses: [],
  questionsYouRespondedTo: [],
  filteredUserResponses: [],
  question: {},
  listOfViewedQuestionIds: [],
  response: [],
  setQuestion: (question: any) => {},
  onPressAddQuestion: ({ question }: { question: any }) => {},
  onPressDeleteQuestion: ({ questionId }: { questionId: String }) => {},
  setIsTabsVisible: (val: boolean) => {},
  onPressAddResponse: ({ response }: { response: any }) => {},
  setAnsweredQuestion: (question: any) => {},
  answeredQuestion: {},
  // reportedQuestions: [],
  addQuestionIdToListOfViewedIds: ({
    questionId,
  }: {
    questionId: String;
  }) => {},
  keyBoardOn: Boolean,
});

export const QuestionsProvider = (props: any) => {
  const [keyBoardOn, setKeyBoardOn] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyBoardOn(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyBoardOn(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [answeredQuestion, setAnsweredQuestion] = useState(null);
  const { data: listOfQuestions, loading } = useSubscription(
    QUESTIONS_SUBSCRIPTION
  ); //execute query
  const { data: response } = useSubscription(RESPONSE_SUBSCRIPTION); //execute query
  const [
    insertQuestion,
    { error, loading: insertQuestionLoading, data: insertQuestionData },
  ] = useMutation(QUESTIONS_MUTATION);
  const [deleteQuestion, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_QUESTION);
  const [
    insertResponse,
    {
      loading: insertResponseLoading,
      error: addResponseError,
      data: addResponseData,
    },
  ] = useMutation(ADD_RESPONSE);
  const { children, setIsTabsVisible } = props;
  const { user } = useContext(UserContext);
  const [localListOfViewedQuestionIds, setLocalListOfViewedQuestionIds] =
    useState([]);

  const addQuestionIdToListOfViewedIds = useCallback(
    ({ questionId }) => {
      setLocalListOfViewedQuestionIds([
        ...localListOfViewedQuestionIds,
        questionId,
      ]);
    },
    [localListOfViewedQuestionIds]
  );

  const listOfViewedQuestionIds = useMemo(() => {
    // List of responded, reported, and skipped questions
    let listOfResponses = [...localListOfViewedQuestionIds];

    response?.response.forEach((resp) => {
      if (resp?.user_id === user?.uid) {
        listOfResponses.push(resp?.question_id);
      }
    });
    return listOfResponses;
  }, [localListOfViewedQuestionIds, response]);

  // const reportedQuestions = useMemo(() => {
  //   const reportedQuestionIds = new Map();

  //   response?.response.forEach((resp) => {
  //     if (resp?.report === 1) {
  //       const questionId = resp?.question_id;
  //       // If the question_id is already in the Map, increment the count; otherwise, set it to 1
  //       if (reportedQuestionIds.has(questionId)) {
  //         reportedQuestionIds.set(
  //           questionId,
  //           reportedQuestionIds.get(questionId) + 1
  //         );
  //       } else {
  //         reportedQuestionIds.set(questionId, 1);
  //       }
  //     }
  //   });
  //   const filteredReportedQuestions = [...reportedQuestionIds]
  //     .filter(([_, count]) => count >= 3)
  //     .map(([questionId]) => questionId);

  //   return filteredReportedQuestions;
  // }, [response]);

  const questionsToBeShownToUser = useMemo(() => {
    return listOfQuestions?.question.filter((item) => {
      return !listOfViewedQuestionIds?.includes(item.id);
      // &&
      // !reportedQuestions?.includes(item.id)
    });
  }, [
    listOfViewedQuestionIds,
    // reportedQuestions
  ]);

  const onPressAddQuestion = ({
    question,
    email,
    user_id,
  }: {
    question: String;
    email: String;
    user_id: String;
  }) => {
    insertQuestion({
      variables: {
        question: question,
        email: email,
        user_id: user_id,
      },
    });
  };

  const onPressAddResponse = ({
    response_1,
    response_2,
    question_id,
    user_id,
    report,
  }: {
    response_1: Object;
    response_2: Object;
    question_id: String;
    user_id: String;
    report: Object;
  }) => {
    insertResponse({
      variables: {
        response_1: response_1,
        response_2: response_2,
        question_id: question_id,
        user_id: user_id,
        report: report,
      },
    });
  };

  const onPressDeleteQuestion = ({ questionId }: { questionId: String }) => {
    deleteQuestion({
      variables: {
        id: questionId,
      },
    });
  };
  const respondedQuestionIds = response?.response
    ?.filter((response) => response?.user_id == user?.uid)
    .filter((resp) => resp?.response_1 == "1" || resp?.response_2 == "1")
    .sort((a, b) => {
      const dateA = new Date(a.added);
      const dateB = new Date(b.added);
      return dateB - dateA;
    })
    .map((resp) => resp.question_id);

  const questionsYouRespondedTo = respondedQuestionIds?.map((questionId) =>
    listOfQuestions?.question.find((question) => question.id === questionId)
  );

  const question =
    questionsToBeShownToUser?.[questionsToBeShownToUser?.length - 1];

  const questions = listOfQuestions?.question;

  const userQuestions = questions
    ?.filter((question) => question?.user_id == user?.uid)
    .sort((a, b) => {
      // Assuming "created_at" is a timestamp or date string, you can convert it to Date objects
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      // Compare the dates to sort in descending order (newest to oldest)
      return dateB - dateA;
    });

  return (
    <QuestionsContext.Provider
      value={{
        question,
        questionsToBeShownToUser,
        questions,
        userQuestions,
        respondedQuestionIds,
        questionsYouRespondedTo,
        response,
        onPressAddQuestion,
        onPressDeleteQuestion,
        setIsTabsVisible,
        onPressAddResponse,
        listOfViewedQuestionIds,
        answeredQuestion,
        setAnsweredQuestion,
        addQuestionIdToListOfViewedIds,
        keyBoardOn,
        // reportedQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
