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
import Feather from "react-native-vector-icons/Feather";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveSize,
} from "../../../scripts/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QuestionRow } from "../../../components/question-row/question-row";
import { SwipeListView } from "react-native-swipe-list-view";
import ModalMain from "../../../components/modalMain";
import ProfileModal from "../../../components/profileModal";
import fonts from "../../../scripts/fonts";
import ModalToDelete from "../../../components/modalToDelete";

export const ProfilePresentation = memo(
  ({
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
    setProfileModalVisible,
    questionToDelete,
  }: ProfileProps): JSX.Element => {
    return (
      <Screen onPressBack={onPressBack} title={"Profile Screen"}>
        <View style={styles.container}>
          <View style={styles.header} />
          <View style={styles.footer}>
            <ModalToDelete
              titleText={"Delete Question?"}
              questionText={questionToDelete}
              deleteModalVisible={deleteModalVisible}
              onPressDeleteQuestionNo={onPressDeleteQuestionNo}
              onPessDeleteQuestionYes={onPessDeleteQuestionYes}
            />
            <ModalMain
              questionVisible={questionVisible}
              selectedQuestionModal={selectedQuestionModal}
              onPressDismissMainModal={onPressDismissMainModal}
            />
            <ProfileModal
              profileModalVisible={profileModalVisible}
              onPressDismissProfileModal={onPressDismissProfileModal}
            />
            <SwipeListView
              data={userQuestions?.length ? userQuestions : defaultQuestions}
              renderItem={({ item }) => (
                <QuestionRow
                  question={item}
                  updateQuestionModal={updateQuestionModal}
                  color={"#ffe6c9"}
                  colorYes={"#65C18C"}
                  colorNo={"#FF6363"}
                />
              )}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{
                paddingTop: responsiveHeight(4),
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
            />
          </View>
          <View style={styles.card}>
            <TouchableOpacity
              onPress={onPressDismissProfileModal}
              style={styles.editButton}
            >
              <Text style={styles.profileName}>{user?.email}</Text>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#ffe6c9",
                  borderRadius: 25,
                  top: responsiveSize(5),
                  left: responsiveSize(4),
                }}
              >
                <Feather
                  name="edit"
                  color="#f25c54"
                  size={25}
                  style={{
                    top: responsiveSize(1),
                    left: responsiveSize(2),
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.cardValueRow}>
              <View style={{ flexDirection: "column" }}>
                <View style={styles.cardValues}>
                  <Text style={styles.largeNumbers}>
                    {userQuestions?.length}
                  </Text>
                </View>
                {/* <Text style={styles.regularText}>{'Your'}</Text> */}
                <Text
                  style={{ ...styles.regularText, top: responsiveHeight(-5) }}
                >
                  {"\nAsked"}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <View style={styles.cardValues}>
                  <Text style={styles.largeNumbers}>{sumReplies}</Text>
                </View>
                {/* <Text style={styles.regularText}>{'Your'}</Text> */}
                <Text
                  style={{ ...styles.regularText, top: responsiveHeight(-5) }}
                >
                  {"\nAnswered"}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <View style={styles.cardValues}>
                  <Text style={styles.largeNumbers}>{sumAnswers}</Text>
                </View>
                {/* <Text style={styles.regularText}>{'Replies'}</Text> */}
                <Text
                  style={{ ...styles.regularText, top: responsiveHeight(-5) }}
                >
                  {"\nRecieved"}
                </Text>
              </View>
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
    top: responsiveHeight(5),
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
    margin: responsiveWidth(3),
    backgroundColor: "#ffe6c9",
    borderRadius: 50,
    width: responsiveSize(23),
    height: responsiveSize(23),
  },
  cardValueRow: {
    top: responsiveHeight(1.5),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  largeNumbers: {
    ...fonts.note,
    fontSize: responsiveFontSize(29),
    fontWeight: "bold",
    color: "#FF6363",
  },
  regularText: {
    ...fonts.note,
    fontSize: responsiveFontSize(17),
    textAlign: "center",
    color: "#FF6363",
    top: responsiveSize(-5),
  },
  editButton: {
    flexDirection: "row",
    bottom: responsiveWidth(-3),
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(5),
  },
});
