import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FlatList,
  Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';
import { useContext } from 'react';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../scripts/constants';
import { CharacterLimit } from '../components/character-limit/character-limit';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AntDesign } from '@expo/vector-icons';
import { ResultsScale } from '../components/resultsScale';
import { BlurView } from 'expo-blur';


const QuestionScreen = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const { question, onPressNextQuestion, onPressAddResponse } = useContext(QuestionsContext)
  const { height } = Dimensions.get("window");
  const { colors } = useTheme();
  const [answerWidth, setAnswerWidth] = useState(45)
  const [buttonPressed, setButtonPressed] = useState(false);


  const questionResult_1 = function () {
    setAnswerWidth((question?.responses_aggregate?.aggregate?.sum?.response_1 / (question?.responses_aggregate?.aggregate?.sum?.response_1 + question?.responses_aggregate?.aggregate?.sum?.response_2)) * 90)
    setButtonPressed(true)
    // onPressAddResponse({ question_id: question?.id, response_1: '1', response_2: '0', user_id: '1' })
    // console.log(question?.responses_aggregate?.aggregate?.sum?.response_1)
  }
  const questionResult_2 = function () {
    setAnswerWidth(0 || (question?.responses_aggregate?.aggregate?.sum?.response_2 / (question?.responses_aggregate?.aggregate?.sum?.response_1 + question?.responses_aggregate?.aggregate?.sum?.response_2)) * 90)
    setButtonPressed(true)
    // onPressAddResponse({ question_id: question?.id, response_1: '0', response_2: '1', user_id: '1' })
  }
  const onPressReport = () => {
    onPressAddResponse({ question_id: question?.id, response_1: '0', response_2: '0', user_id: '1', report: '1' })
    setModalVisible(true)
    setTimeout(() => {
      setModalVisible(false)
      setButtonPressed(false)
      setAnswerWidth(45)
      onPressNextQuestion()
    }, 1500);

  }
  const nextQuestion = function () {
    setButtonPressed(false)
    setAnswerWidth(45)
    onPressNextQuestion()
    console.log('q:', question?.question)
    console.log('q1:', question?.responses_aggregate?.aggregate?.sum?.response_1 || 0)
    console.log("q2:", question?.responses_aggregate?.aggregate?.sum?.response_2 || 0)
    console.log("q1%:", (question?.responses_aggregate?.aggregate?.sum?.response_1 / (question?.responses_aggregate?.aggregate?.sum?.response_1 + question?.responses_aggregate?.aggregate?.sum?.response_2)) || 0 * 90)
    console.log("q2%:", (question?.responses_aggregate?.aggregate?.sum?.response_2 / (question?.responses_aggregate?.aggregate?.sum?.response_1 + question?.responses_aggregate?.aggregate?.sum?.response_2)) || 0 * 90)
  }
  const [modalVisible, setModalVisible] = useState(false);

  // console.log((questions?.answer_1 + 1) / (questions?.answer_1 + questions?.answer_2) * 90)
  // console.log(question?.answer_1 + 1)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor='#e32f45' barStyle="light-content" />
        <Text style={styles.text_header}>
          {'Questions'}
        </Text>
      </View>



      <ScrollView>
        <View style={{
          ...styles.inputTextContainer,
          height: responsiveHeight(35),
          width: responsiveWidth(90)
        }}>
          <View style={{ flex: 1, alignContent: "center", alignItems: "center", justifyContent: 'center' }}>
            <Text
              adjustsFontSizeToFit={true}
              // numberOfLines={10}
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: responsiveFontSize(20)
                // paddingHorizontal: responsiveWidth(1),
                // marginBottom: responsiveHeight(1)
              }}
            >
              {question?.question}

            </Text>
          </View>
          <View style={{ justifyContent: "flex-end", flexDirection: 'column' }}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <TouchableOpacity
                onPress={onPressReport}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <AntDesign
                  name="frown"
                  size={30}
                  color='#e32f45'
                  style={{ margin: 3 }} />
                <Text>{'Report'}</Text></TouchableOpacity>
              <TouchableOpacity
                onPress={() => nextQuestion()}
                style={{ flexDirection: 'row', alignItems: 'center' }} ><Text>{'Next'}</Text><AntDesign name="caretright" size={38} color='#e32f45' /></TouchableOpacity>

            </View>
          </View>
        </View>

        <View style={{
          marginTop: responsiveHeight(5),
          alignSelf: 'center',
          flexDirection: "row",
          borderRadius: 10,
          width: responsiveWidth(90),
          shadowColor: "#e32f45",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        }
        }>

          <View style={{
            alignSelf: 'center',
            flexDirection: "row",
            borderRadius: 10,
            width: responsiveWidth(90),
            overflow: 'hidden',
          }}>
            <TouchableOpacity
              onPress={() => { if (buttonPressed === false) questionResult_1() }}
              style={{
                backgroundColor: "#54a832",
                height: responsiveHeight(7),
                width: responsiveWidth(answerWidth),
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text style={{ fontWeight: 'bold', color: "white" }}>{buttonPressed ? `Yes, ${Math.round(answerWidth * 1.11111)}%` : `Yes`}</Text></TouchableOpacity>
            <TouchableOpacity
              onPress={() => { if (buttonPressed === false) questionResult_2() }}
              style={{
                backgroundColor: "#e32f45",
                height: responsiveHeight(7),
                width: responsiveWidth(90 - answerWidth),
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
              }}><Text style={{ fontWeight: 'bold', color: "white" }}>{buttonPressed ? `No, ${Math.round(100 - answerWidth * 1.11111)}%` : `No`}</Text></TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <BlurView
            intensity={5} style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Reported</Text>
            </View>
          </BlurView>
        </Modal>
      </ScrollView >
    </View >
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: responsiveHeight(4),
    backgroundColor: '#e32f45',
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(30),
    alignSelf: 'center',
    paddingTop: responsiveHeight(6),

  },
  button: {
    alignItems: 'center',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputTextContainer: {
    // flex: 1,
    margin: responsiveWidth(10),
    alignSelf: 'center',
    padding: 8,
    // paddingTop: 5,
    color: '#e32f45',
    borderWidth: 0.5,
    borderColor: '#FA7465',
    // minHeight: height * 0.15,
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  modalView: {
    // margin: 20,
    // backgroundColor: '#e32f45',
    borderRadius: 20,
    top: responsiveHeight(-17),
    padding: 35,
    alignItems: 'center',
    shadowColor: '#e32f45',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: responsiveFontSize(70),
    color: '#e32f45'

  },
});