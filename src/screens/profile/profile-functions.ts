import React, { useEffect, useMemo, useState } from "react";
import { QuestionsContext } from "../../../contexts/questions-context-provider";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user-context-provider";

export const useProfileFunctions = (props: any) => {

  const { navigation, route } = props
  const { params } = route


    const onPressBack = (): void => {
      navigation.goBack()
    }

    const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);

  const [selectedQuestionModal, setSelectedQuestionModal] = useState({});
  const [questionIdToDelete, setQuestionIdToDelete] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressDismissMainModal = () => {
    setQuestionVisible(!questionVisible);
  };
  const onPressDismissProfileModal = () => {
    setProfileModalVisible(!profileModalVisible);
  };
  const onPressTrashCan = (itemId) => {
    setDeleteModalVisible(!deleteModalVisible);
    setQuestionIdToDelete(itemId);
    console.log(itemId);
  };

  const onPressDeleteQuestionNo = () => {
    setDeleteModalVisible(false);
    setQuestionIdToDelete(null);
  };

  const onPessDeleteQuestionYes = () => {
    setModalVisible(false);
    onPressDeleteQuestion({ questionId: questionIdToDelete });
    console.log(questionIdToDelete);
  };

  useEffect(() => {
    const answer_1 = selectedQuestionModal?.answer_1;
    const answer_2 = selectedQuestionModal?.answer_2;
  }, [selectedQuestionModal]);

  const updateQuestionModal = (incomingModalData) => {
    setSelectedQuestionModal(incomingModalData);
    setQuestionVisible(!modalVisible);
  };
  const { questions, response, onPressDeleteQuestion, userQuestions } =
    useContext(QuestionsContext);

  const { user } = useContext(UserContext);

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
    let sum = 0;
    response?.response.forEach((resp) => {
      if (resp?.user_id === user?.uid) {
        if (resp?.response_1 !== 0 || resp?.response_2 !== 0) {
          sum += 1;
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
      question: "Sample Question",
      responses_aggregate: {
        __typename: "response_aggregate",
        aggregate: {
          __typename: "response_aggregate_fields",
          sum: {
            __typename: "response_sum_fields",
            response_1: 51,
            response_2: 49,
          },
        },
      },
      user_id: "HBlSWJoP5dcK1LEJPMqeGio9JXo2",
    },
  ];

    return {
      onPressBack,
      deleteModalVisible,
      onPressDeleteQuestionNo,
      onPessDeleteQuestionYes,
      questionVisible,
      selectedQuestionModal,
      onPressDismissMainModal,
      profileModalVisible,
      onPressDismissProfileModal,
      userQuestions,
      defaultQuestions,
      updateQuestionModal,
      onPressTrashCan,
      sumAnswers,
      user,
      sumReplies,  
    }
}
