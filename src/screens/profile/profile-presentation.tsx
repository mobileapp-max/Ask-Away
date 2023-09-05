import { Screen } from "../../components/screen/screen";
import { ProfileProps } from "./profile-interface";
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
  responsiveFontSize,
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
import { colors } from "../../../assets/colors";

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
                  fontSize: responsiveFontSize(30),
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
                  top: responsiveSize(7),
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
              {/* <View> */}
              <TouchableOpacity
                onPress={() => setAreQuestionsDisplayed(true)}
                style={{ flexDirection: "column", marginRight: 10 }}
              >
                <View
                  style={{
                    ...styles.cardValues,
                    backgroundColor: areQuestionsDisplayed
                      ? "#ffe6c9"
                      : "#ffcd96",
                    borderColor: "#ffe6c9",
                    borderWidth: !areQuestionsDisplayed
                      ? StyleSheet.hairlineWidth * 2
                      : 0,
                    shadowColor: areQuestionsDisplayed ? "#ffe6c9" : "#e32f45",
                  }}
                >
                  <Text style={styles.largeNumbers}>
                    {userQuestions?.length}
                  </Text>
                  <Text style={{ ...styles.regularText }}>{"\nQuestions"}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAreQuestionsDisplayed(false)}
                style={{ flexDirection: "column" }}
              >
                <View
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
                  <Text style={{ ...styles.regularText }}>{"\nAnswers"}</Text>
                </View>
                {/* <Text style={styles.regularText}>{'Your'}</Text> */}
              </TouchableOpacity>
              {/* <View style={{ flexDirection: "column" }}>
                <View style={styles.cardValues}>
                  <Text style={styles.largeNumbers}>{sumAnswers}</Text>
                </View>
                <Text style={styles.regularText}>{"Replies"}</Text>
                <Text
                  style={{ ...styles.regularText, top: responsiveHeight(-5) }}
                >
                  {"\nRecieved"}
                </Text>
              </View> */}
              {/* </View> */}
            </View>
          </View>
        </View>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
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
    fontSize: responsiveFontSize(26),
    color: "#FF6363",
  },
  card: {
    position: "absolute",
    backgroundColor: "#ffcd96",
    width: responsiveWidth(85),
    height: responsiveHeight(20),
    borderColor: "#FF6363",
    alignSelf: "center",
    borderRadius: 25,
    top: responsiveHeight(6),
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

    alignItems: "center",
    margin: responsiveWidth(0.5),
    backgroundColor: "#ffe6c9",
    borderRadius: responsiveSize(5),
    width: responsiveSize(55),
    height: responsiveSize(40),
    justifyContent: "center",
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
    flexDirection: "row",
    justifyContent: "center",
    top: responsiveSize(8),

    // alignItems: "flex-end",
    // alignSelf: "stretch",
    // alignContent: "flex-end",
  },
  largeNumbers: {
    ...fonts.note,
    fontSize: responsiveFontSize(35),
    fontWeight: "bold",
    color: "#FF6363",
    top: responsiveSize(8),
  },
  regularText: {
    ...fonts.note,
    fontSize: responsiveFontSize(20),
    textAlign: "center",
    color: "#FF6363",
    top: responsiveSize(-9),
  },
  editButton: {
    flexDirection: "row",
    bottom: responsiveWidth(-3),
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(5),
  },
});
