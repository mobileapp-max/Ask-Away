import { useState } from "react";
import {
  Animated, Platform,
} from "react-native";
import { useContext } from "react";
import { QuestionsContext } from "../../../contexts/questions-context-provider";
import {
  responsiveFontSize,
} from "../../../scripts/constants";
import { UserContext } from "../../../contexts/user-context-provider";

export const useAnswerQuestionsFunctions = (props: any) => {

  const { navigation, route } = props
  const { params } = route

  const onPressBack = (): void => {
    navigation.goBack()
  }

  const { user } = useContext(UserContext);
  const {
    question,
    onPressAddResponse,
    answeredQuestion,
    setAnsweredQuestion,
    addQuestionIdToListOfViewedIds,
  } = useContext(QuestionsContext);
  const [answerWidth, setAnswerWidth] = useState(45);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextButton, setNextButton] = useState(new Animated.Value(-10));
  const [isConditionTrue, setIsConditionTrue] = useState(true);
  const [fontSize, setFontSize] = useState(responsiveFontSize(26));
  const color1 = "#f79d65";
  const color2 = "#f4845f";
  const elephant = Platform.OS === 'ios' ?
    require("../../../assets/animations/elephan_2_ios.json")
    : require("../../../assets/animations/elephan_2.json")

  const questionResult_1 = function () {
    setAnsweredQuestion(question);
    setAnswerWidth(
      ((question?.responses_aggregate?.aggregate?.sum?.response_1 + 1) /
        (question?.responses_aggregate?.aggregate?.sum?.response_1 +
          question?.responses_aggregate?.aggregate?.sum?.response_2 +
          1)) *
      90
    );
    setButtonPressed(true);
    onPressAddResponse({
      question_id: question?.id,
      response_1: "1",
      response_2: "0",
      user_id: user?.uid || "anonymous",
      report: "0",
    });
  };

  const questionResult_2 = function () {
    setAnsweredQuestion(question);
    setAnswerWidth(
      90 -
      ((question?.responses_aggregate?.aggregate?.sum?.response_2 + 1) /
        (question?.responses_aggregate?.aggregate?.sum?.response_1 +
          question?.responses_aggregate?.aggregate?.sum?.response_2 +
          1)) *
      90
    );
    setButtonPressed(true);
    onPressAddResponse({
      question_id: question?.id,
      response_1: "0",
      response_2: "1",
      user_id: user?.uid || "anonymous",
      report: "0",
    });
  };

  const onPressReport = () => {
    setModalVisible(true);
    setTimeout(() => {
      setButtonPressed(false);
      setAnswerWidth(45);
      addQuestionIdToListOfViewedIds({ questionId: question?.id });
      setIsConditionTrue(!isConditionTrue);
      onPressAddResponse({
        question_id: question?.id,
        response_1: "0",
        response_2: "0",
        user_id: user?.uid || "anonymous",
        report: "1",
      });
      setModalVisible(false);
      setAnsweredQuestion(null);
    }, 1500);
  };

  const onPressNextQuestion = function () {
    addQuestionIdToListOfViewedIds({ questionId: question?.id });
    setIsConditionTrue(!isConditionTrue);
    if (buttonPressed) {
      setAnsweredQuestion(null);
      setButtonPressed(false);
      setAnswerWidth(45);
    } else {
      onPressAddResponse({
        question_id: question?.id,
        response_1: "0",
        response_2: "0",
        user_id: user?.uid || "anonymous",
        report: "0",
      });
    }
  };

  const currentQuestionText = answeredQuestion?.question || question?.question || '';

  const handleTextLayout = () => {
    const decreaseFactor = question
      ? Math.floor(currentQuestionText.length / 50)
      : "";
    const newFontSize = Math.max(responsiveFontSize(26) - decreaseFactor, 10);
    setFontSize(newFontSize);
  };

  return {
    onPressBack,
    isConditionTrue,
    color1,
    color2,
    handleTextLayout,
    fontSize,
    currentQuestionText,
    question,
    onPressReport,
    onPressNextQuestion,
    answerWidth,
    buttonPressed,
    questionResult_1,
    questionResult_2,
    modalVisible,
    setModalVisible,
    nextButton,
    elephant
  }
}
