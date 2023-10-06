import { Screen } from "../../components/screen/screen";
import { ProfileProps } from "./profile-interface";
import {
  responsiveType,
  useResponsiveSizes,
} from "react-native-responsive-sizes";
import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveSize,
} from "../../../scripts/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QuestionRow } from "../../../components/question-row/question-row";
import { SwipeListView } from "react-native-swipe-list-view";
import ProfileModal from "../../../components/profileModal";
import fonts from "../../../scripts/fonts";
import ModalToAddOrDeleteQuestion from "../../../components/modalToAddOrDeleteQuestion";
import QuestionReviewModal from "../../../components/questionReviewMondal";
import { ConfirmatioModal } from "../../../components/confirmationModal";
import { Ionicons } from "@expo/vector-icons";

export const ProfilePresentation = memo(
  ({
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
    questionToAddOrDelete,
    setIsConfirmationModalVisible,
    isConfirmationModalVisible,
    questionsYouRespondedTo,
    setAreQuestionsDisplayed,
    areQuestionsDisplayed,
    defaultAnswer,
  }: ProfileProps): JSX.Element => {
    const responsive = useResponsiveSizes();
    const styles = getStyles(responsive);

    return (
      <Screen onPressBack={onPressBack} title={"Profile Screen"}>
        <View style={styles.container}>
          <View style={styles.header} />
          <View style={styles.footer}>
            <ModalToAddOrDeleteQuestion
              titleText={"Delete Question?"}
              questionText={questionToAddOrDelete}
              modalToAddOrDeleteQuestionVisible={
                modalToAddOrDeleteQuestionVisible
              }
              onPressAddOrDeleteQuestionNo={onPressAddOrDeleteQuestionNo}
              onPressAddOrDeleteQuestionYes={onPressAddOrDeleteQuestionYes}
            />
            <QuestionReviewModal
              QuestionReviewModalVisible={QuestionReviewModalVisible}
              selectedQuestionForReviewModal={selectedQuestionForReviewModal}
              onPressDissmissQuestionReviewModal={
                onPressDissmissQuestionReviewModal
              }
            />
            <ProfileModal
              profileModalVisible={profileModalVisible}
              onPressDismissProfileModal={onPressDismissProfileModal}
            />
            <ConfirmatioModal
              modalVisible={isConfirmationModalVisible}
              setModalVisible={setIsConfirmationModalVisible}
              messageToDisplay={"Deleted"}
              tintColor={"dark"}
            />
            <SwipeListView
              data={
                areQuestionsDisplayed
                  ? userQuestions?.length
                    ? userQuestions
                    : defaultQuestions
                  : questionsYouRespondedTo?.length
                  ? questionsYouRespondedTo
                  : defaultAnswer
              }
              renderItem={({ item }) => {
                return (
                  <QuestionRow
                    question={item}
                    updateQuestionModal={updateQuestionModal}
                    color={"#ffe6c9"}
                    colorYes={"#65C18C"}
                    colorNo={"#FF6363"}
                  />
                );
              }}
              keyExtractor={(item, index) => item?.id}
              contentContainerStyle={{
                paddingTop: responsiveHeight(5),
                paddingBottom: responsiveHeight(20),
              }}
              renderHiddenItem={({ item }) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignContent: "center",
                      alignItems: "center",
                      left: responsiveWidth(-5),
                      flex: 1,
                      // alignSelf: "center",
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        onPressTrashCan({
                          itemId: item?.id,
                          itemQuestion: item?.question,
                        })
                      }
                    >
                      <MaterialCommunityIcons
                        name="delete-forever"
                        size={30}
                        color="white"
                        style={{ margin: 3 }}
                      />
                    </Pressable>
                  </View>
                );
              }}
              rightOpenValue={-75}
              disableRightSwipe={true}
              disableLeftSwipe={!areQuestionsDisplayed}
            />
          </View>
          <View style={styles.card}>
            <TouchableOpacity
              onPress={onPressDismissProfileModal}
              style={styles.editButton}
            >
              <Text
                style={{
                  ...styles.profileName,
                }}
              >
                {"Your"}
              </Text>
              <View
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: "#ffe6c9",
                  borderRadius: 25,
                  top: responsiveSize(10),
                  left: responsiveSize(4),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="md-chevron-down-sharp"
                  size={25}
                  color="#f25c54"
                />
              </View>
            </TouchableOpacity>
            <View style={styles.cardValueRow}>
              <>
                {[
                  {
                    text: "Answers",
                    numberValue: sumReplies,
                    onPress: () => setAreQuestionsDisplayed(false),
                    areQuestionsDisplayed: !areQuestionsDisplayed,
                  },
                  {
                    text: "Questions",
                    numberValue: userQuestions?.length,
                    onPress: () => setAreQuestionsDisplayed(true),
                    areQuestionsDisplayed: areQuestionsDisplayed,
                  },
                ].map((item, index) => (
                  <View>
                    <TouchableOpacity
                      onPress={item?.onPress}
                      style={{
                        ...styles.cardValues,
                        backgroundColor: item?.areQuestionsDisplayed
                          ? "#ffe6c9"
                          : "#ffcd96",
                        borderColor: "#ffe6c9",
                        borderWidth: !item?.areQuestionsDisplayed
                          ? StyleSheet.hairlineWidth * 2
                          : 0,
                        shadowColor: item?.areQuestionsDisplayed
                          ? "#ffe6c9"
                          : "#e32f45",
                      }}
                    >
                      <Text style={styles.largeNumbers}>
                        {item?.numberValue}
                      </Text>
                    </TouchableOpacity>
                    <Text style={{ ...styles.regularText }}>{item?.text}</Text>
                  </View>
                ))}
              </>
              {/* <View>
                <TouchableOpacity
                  onPress={() => setAreQuestionsDisplayed(false)}
                  style={{
                    ...styles.cardValues,
                    backgroundColor: !areQuestionsDisplayed
                      ? "#ffe6c9"
                      : "#ffcd96",
                    borderColor: "#ffe6c9",
                    borderWidth: areQuestionsDisplayed
                      ? StyleSheet.hairlineWidth * 2
                      : 0,
                    shadowColor: !areQuestionsDisplayed ? "#ffe6c9" : "#e32f45",
                  }}
                >
                  <Text style={styles.largeNumbers}>{sumReplies}</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.regularText }}>{"Answers"}</Text>
              </View> */}
            </View>
          </View>
        </View>
      </Screen>
    );
  }
);

const getStyles = (responsive: responsiveType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: "#f25c54",
      flex: 1.6,
    },
    footer: {
      flex: 5,
      backgroundColor: "#f7b267",
      overflow: "visible",
    },
    profileName: {
      ...fonts.note,
      fontWeight: "bold",
      fontSize: responsive.fontSize(30),
      color: "#FF6363",
    },
    card: {
      position: "absolute",
      backgroundColor: "#ffcd96",
      width: responsive.width(85),
      height: responsive.height(20),
      borderColor: "#FF6363",
      alignSelf: "center",
      borderRadius: 25,
      top: responsive.height(6),
      shadowColor: "#e32f45",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    cardValues: {
      flexDirection: "column",
      marginHorizontal: responsive.size(17),
      alignItems: "center",
      margin: responsive.width(0.5),
      backgroundColor: "#ffe6c9",
      borderRadius: responsive.size(5),
      width: responsive.width(20),
      height: responsive.height(8),
      shadowColor: "#e32f45",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    cardValueRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
      alignContent: "center",
      alignItems: "center",
      // backgroundColor: "red",
    },
    largeNumbers: {
      ...fonts.note,
      fontSize: responsive.fontSize(30),
      fontWeight: "bold",
      color: "#FF6363",
    },
    regularText: {
      ...fonts.note,
      fontSize: responsive.fontSize(20),
      textAlign: "center",
      color: "#FF6363",
    },
    editButton: {
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: responsive.width(5),
    },
  });
};
