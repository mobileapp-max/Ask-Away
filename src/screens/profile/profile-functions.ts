import React, { useEffect, useMemo, useReducer, useState } from "react";
import { QuestionsContext } from "../../../contexts/questions-context-provider";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user-context-provider";

export const useProfileFunctions = (props: any) => {

  const { navigation, route } = props
  const { params } = route

  const onPressBack = (): void => {
    navigation.goBack()
  }

  const [modalToAddOrDeleteQuestionVisible, setDeleteModalVisible] = useState(false);
  const [QuestionReviewModalVisible, setQuestionVisible] = useState(false);
  const [questionToAddOrDelete, setQuestionToDelete] = useState(null)
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedQuestionForReviewModal, setSelectedQuestionModal] = useState({});
  const [questionIdToDelete, setQuestionIdToDelete] = useState(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false)

  const [areQuestionsDisplayed, setAreQuestionsDisplayed] = useState(true)

  const [modalVisible, setModalVisible] = useState(false);

  const onPressDissmissQuestionReviewModal = () => {
    setQuestionVisible(!QuestionReviewModalVisible);
  };
  const onPressDismissProfileModal = () => {
    setProfileModalVisible(!profileModalVisible);
  };
  const onPressTrashCan = ({ itemId, itemQuestion }: { itemId: string, itemQuestion: string }) => {
    setDeleteModalVisible(!modalToAddOrDeleteQuestionVisible);
    setQuestionIdToDelete(itemId);
    setQuestionToDelete(itemQuestion);
  };

  const onPressAddOrDeleteQuestionNo = () => {
    setDeleteModalVisible(false);
    setQuestionIdToDelete(null);
  };

  const onPressAddOrDeleteQuestionYes = () => {
    setDeleteModalVisible(false);

    setIsConfirmationModalVisible(true);
    setTimeout(() => {
      setIsConfirmationModalVisible(false);
    }, 2000);

    onPressDeleteQuestion({ questionId: questionIdToDelete });
  };

  useEffect(() => {
    const answer_1 = selectedQuestionForReviewModal?.answer_1;
    const answer_2 = selectedQuestionForReviewModal?.answer_2;
  }, [selectedQuestionForReviewModal]);

  const updateQuestionModal = (incomingModalData) => {
    setSelectedQuestionModal(incomingModalData);
    setQuestionVisible(!modalVisible);
  };
  const { questions, response, onPressDeleteQuestion, userQuestions, userResponses, questionsYouRespondedTo, respondedQuestionIds } =
    useContext(QuestionsContext);

  const { user } = useContext(UserContext);

  // console.log('questionsYouRespondedTo', questionsYouRespondedTo[8])

  const sumAnswers = useMemo(() => {
    let sum = 0;
    userQuestions?.forEach((question) => {
      sum +=
        question?.responses_aggregate?.aggregate?.sum?.response_1 +
        question?.responses_aggregate?.aggregate?.sum?.response_2;
    });
    return sum;
  }, [userQuestions]);

  const sumReplies = useMemo(() => {
    const seenQuestionIds = new Set();
    let sum = 0;

    response?.response.forEach((resp) => {
      if (resp?.user_id === user?.uid) {
        const questionId = resp?.question_id;

        if (!seenQuestionIds.has(questionId)) {
          seenQuestionIds.add(questionId);

          if (resp?.response_1 !== 0 || resp?.response_2 !== 0) {
            sum += 1;
          }
        }
      }
    });
    return sum;
  }, [response]);


  const defaultQuestions = [
    {
      __typename: "question",
      answer_1: 0,
      answer_2: 0,
      created_at: "2023-03-07T22:03:57.695653+00:00",
      id: "6834fa7a-683b-492c-9297-1c52464a84f2",
      question: "Your questions will display here.",
      responses_aggregate: {
        __typename: "response_aggregate",
        aggregate: {
          __typename: "response_aggregate_fields",
          sum: {
            __typename: "response_sum_fields",
            response_1: 0,
            response_2: 0,
          },
        },
      },
      user_id: "HBlSWJoP5dcK1LEJPMqeGio9JXo2",
    },
  ];
  const defaultAnswer = [
    {
      __typename: "question",
      answer_1: 0,
      answer_2: 0,
      created_at: "2023-03-07T22:03:57.695653+00:00",
      id: "6834fa7a-683b-492c-9297-1c52464a84f3",
      question: "Answers will display here.",
      responses_aggregate: {
        __typename: "response_aggregate",
        aggregate: {
          __typename: "response_aggregate_fields",
          sum: {
            __typename: "response_sum_fields",
            response_1: 0,
            response_2: 0,
          },
        },
      },
      user_id: "HBlSWJoP5dcK1LEJPMqeGio9JXo2",
    },
  ];

  return {
    onPressBack,
    modalToAddOrDeleteQuestionVisible,
    onPressAddOrDeleteQuestionNo,
    onPressAddOrDeleteQuestionYes,
    QuestionReviewModalVisible,
    selectedQuestionForReviewModal,
    onPressDissmissQuestionReviewModal,
    profileModalVisible,
    onPressDismissProfileModal,
    userQuestions,
    defaultQuestions,
    updateQuestionModal,
    onPressTrashCan,
    sumAnswers,
    user,
    sumReplies,
    setProfileModalVisible,
    questionToAddOrDelete,
    setIsConfirmationModalVisible,
    isConfirmationModalVisible,
    questionsYouRespondedTo,
    setAreQuestionsDisplayed,
    areQuestionsDisplayed,
    defaultAnswer
  }
}
