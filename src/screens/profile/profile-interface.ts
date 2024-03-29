export interface ProfileProps {
  onPressBack: () => void,
  modalToAddOrDeleteQuestionVisible: boolean,
  onPressAddOrDeleteQuestionNo: () => void,
  onPressAddOrDeleteQuestionYes: () => void,
  QuestionReviewModalVisible: boolean,
  selectedQuestionForReviewModal: string,
  onPressDissmissQuestionReviewModal: () => void,
  profileModalVisible: boolean,
  onPressDismissProfileModal: () => void,
  userQuestions: any,
  defaultQuestions: any,
  updateQuestionModal: (question: string) => void,
  onPressTrashCan: (item: { itemId: string, itemQuestion: string }) => void,
  user: any,
  sumReplies: number,
  questionToAddOrDelete: string,
  setIsConfirmationModalVisible: (value: boolean) => void,
  isConfirmationModalVisible: boolean,
  questionsYouRespondedTo: any,
  setAreQuestionsDisplayed: (value: boolean) => void,
  areQuestionsDisplayed: boolean,
  defaultAnswer: any,
  keyBoardOn: boolean,
}