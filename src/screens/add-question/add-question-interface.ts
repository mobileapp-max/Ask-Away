export interface AddQuestionProps {

  onPressBack: () => void;
  onPressTrashCan: () => void;
  disableButton: boolean;
  text: string;
  modalToAddOrDeleteQuestionVisible: boolean;
  onPressAddOrDeleteQuestionYes: () => void;
  onPressAddOrDeleteQuestionNo: () => void;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  handleButtonPress: () => void;
  handleKeyPress: () => void;
  handleOnSubmitEditing: () => void;
  inputRef?: any;
  newString: string;
  fontSize: number;
  handleChangeText: (text: string) => void;
  handleClearText: () => void;
  questionText: string;
  keyBoardOn: boolean;
  textInputSelected: boolean;
  initialH?: any;
  currentHeight?: any;
  setCurrentHeight?: (text: strign) => void;
  onLayout?: (event: any) => void;

}