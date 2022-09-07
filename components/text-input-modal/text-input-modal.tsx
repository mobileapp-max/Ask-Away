// import * as React from "react"
// import { Image, Text, View, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button } from "react-native"
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from "../../theme/constants"
// import { ModalAlert } from "../modal-alert/modal-alert"
// import { TextInputModalProps } from "./text-input-modal-interface"


// export const TextInputModal = (props: TextInputModalProps) => {

//   // INCOMING PROPS
//   const {
//     preset = 'default',
//     style,
//     isTextInputModalVisible,
//     toggleIsTextInputModalVisible,
//     onPressSendComment,
//     currentlyCommentingPostOrComment,
//     updateWrittenCommentText,
//     writtenCommentText
//   } = props


//   return (
//     <View style={{ ...style, height: isTextInputModalVisible ? responsiveHeight(100) : null }}>
//       <ModalAlert
//         visible={isTextInputModalVisible}
//         dismissFunction={toggleIsTextInputModalVisible}
//         isDisappearingOnTap={false}
//         innerBackgroundColor={"#00000050"}
//         style={{ shadowColor: "#000", shadowOpacity: 1, height: isTextInputModalVisible ? responsiveHeight(100) : null }}
//       >
//         <Text
//           style={{
//             fontSize: responsiveFontSize(20),
//             fontFamily: "AvenirNext-DemiBold",
//             maxWidth: "100%",
//             color: "#ffffff",
//             textAlign: 'center',
//             position: 'absolute',
//             top: responsiveHeight(10),
//             paddingHorizontal: responsiveWidth(3)
//           }}
//         >
//           {`You are responding to ${currentlyCommentingPostOrComment?.user?.first_name} @${currentlyCommentingPostOrComment?.user?.username}'s ${currentlyCommentingPostOrComment?.type || "Comment"}:`}
//         </Text>
//         <View
//           style={{
//             alignContent: "center",
//             alignItems: "center",
//             alignSelf: "center",
//             justifyContent: 'center',
//             height: responsiveHeight(100)
//           }}
//         >
//           <View style={{ width: responsiveWidth(80) }}  >
//             <View
//               style={{
//                 paddingLeft: responsiveWidth(5),
//                 paddingRight: responsiveWidth(5),
//               }}
//             >
//               <TextInput
//                 inputAccessoryViewID={"1"}
//                 placeholderTextColor={'#c1c1c1'}
//                 onChangeText={(value) => updateWrittenCommentText(value)}
//                 placeholder={`Message...`}
//                 value={writtenCommentText}
//                 style={{ height: null, maxHeight: responsiveHeight(50), marginVertical: responsiveHeight(3) }}
//                 autoCorrect={false}
//                 multiline={true}
//               />
//             </View>
//           </View>
//         </View>
//         <Button
//           onPress={onPressSendComment}
//           style={{ height: responsiveWidth(10), width: responsiveWidth(70), top: responsiveHeight(-10), marginVertical: responsiveHeight(0.5) }}
//           textStyle={{ fontFamily: "AvenirNext-Bold", color: "#1c1c1c" }}
//           text={`Send`}
//         />
//         <Button
//           onPress={toggleIsTextInputModalVisible}
//           style={{ height: responsiveWidth(10), width: responsiveWidth(70), top: responsiveHeight(-10), marginVertical: responsiveHeight(0.5) }}
//           textStyle={{ fontFamily: "AvenirNext-Bold", color: "#C1C1C199" }}
//           text={"Cancel"}
//         />
//       </ModalAlert>
//     </View>
//   )
// }

// export const TextInputModalStyles = StyleSheet.create({
// });