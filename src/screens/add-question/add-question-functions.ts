import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Keyboard,
} from "react-native";
import { useContext } from "react";
import {
  responsiveFontSize,
} from "../../../scripts/constants";
import { UserContext } from "../../../contexts/user-context-provider";
import { QuestionsContext } from "../../../contexts/questions-context-provider";


export const useAddQuestionFunctions = (props: any) => {

  const { navigation, route } = props
  const [textInputSelected, setTextInputSelected] = useState(false);

  const onPressBack = (): void => {
    navigation.goBack()
  }
  const inputRef = useRef(null);
  const handleButtonPress = () => {
    inputRef?.current.focus();
    setTextInputSelected(true)

  };
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { onPressAddQuestion } = useContext(QuestionsContext);
  const onPressInitiateAddQuestin = () => {
    setText("");
    onPressAddQuestion({
      question: text?.trim(),
      email: user?.email,
      user_id: user?.uid,
    });
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  useEffect(() => {
    if (text !== "") {
      setDisableButton(false);
    } else setDisableButton(true);
  }, [text]);

  function handleKeyPress(e: any) {
    if (e.nativeEvent.key === "Return") {
      e.preventDefault();
    }
  }

  function removeLineBreaks(str: string) {
    return str.replace(/\n/g, " ").replace(/\s+/g, " ");
  }
  const newString = removeLineBreaks(text);

  useEffect(() => {
    function removeLineBreaks(text: string) {
      return;
    }
  }, [text]);

  const handleOnSubmitEditing = () => {
    Keyboard.dismiss();
  };

  const handleClearText = () => {
    setText("");
  };

  const [modalToAddOrDeleteQuestionVisible, setDeleteModalVisible] = useState(false);
  const onPressTrashCan = () => {
    setDeleteModalVisible(!modalToAddOrDeleteQuestionVisible);
  };

  const onPressAddOrDeleteQuestionNo = () => {
    setDeleteModalVisible(false);
  };

  const onPressAddOrDeleteQuestionYes = () => {
    setDeleteModalVisible(false);
    onPressInitiateAddQuestin();
  };

  const [fontSize, setFontSize] = useState(responsiveFontSize(30)); // Default font size

  const handleChangeText = (text: string) => {
    setText(text);
    const newTextLength = text.length;
    const decreaseFactor = Math.floor(newTextLength / 20); // Decrease font size for every 60 characters
    const newFontSize = Math.max(responsiveFontSize(35) - decreaseFactor, 10); // Minimum font size of 10
    setFontSize(newFontSize);
  };
  const initialH = useRef(null);
  const [currentHeight, setCurrentHeight] = useState(null);

  const onLayout = useCallback(
    (event: any) => {
      const { height } = event.nativeEvent.layout;

      if (initialH.current === null) {
        initialH.current = height;
        setCurrentHeight(height); // Always update current height
      }
      setCurrentHeight(height); // Always update current height
    },
    [initialH]
  );

  return {
    onPressBack,
    onPressTrashCan,
    disableButton,
    text,
    modalToAddOrDeleteQuestionVisible,
    onPressAddOrDeleteQuestionYes,
    onPressAddOrDeleteQuestionNo,
    modalVisible,
    setModalVisible,
    handleButtonPress,
    handleKeyPress,
    handleOnSubmitEditing,
    inputRef,
    newString,
    fontSize,
    handleChangeText,
    handleClearText,
    textInputSelected,
    initialH,
    currentHeight,
    onLayout
  }
}
