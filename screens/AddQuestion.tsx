import React, { useState, useEffect } from 'react';
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
  Keyboard,
  Pressable,
  Modal

} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';
import { useContext } from 'react';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../scripts/constants';
import { CharacterLimit } from '../components/character-limit/character-limit';
import { BlurView } from 'expo-blur';
import ButtonQApp from '../components/buttonQApp';



const AddQ = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const { height } = Dimensions.get("window");
  const { colors } = useTheme();
  const [disableButton, setDisableButton] = useState(true)
  const [todos, setTodos] = useState([]);
  const [addData, setAddData] = useState('');
  const { onPressAddQuestion, questions, question, onPressNextQuestion, onPressDeleteQuestion } = useContext(QuestionsContext)
  const onPressPostQuestin = () => {
    setText('')
    onPressAddQuestion({ text: text?.trim() })
    setModalVisible(true)
    setTimeout(() => {
      setModalVisible(false)
    }, 1000);
  }
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (text !== '') {
      setDisableButton(false)
    }
    else setDisableButton(true)
  }, [text])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#e32f45' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>
          {'Ask'}
        </Text>
        <Text
          style={{
            ...styles.text_header,
            paddingTop: 0,
            fontSize: responsiveFontSize(30),
            top: responsiveHeight(0)
          }}>
          {'Yes-No Questions'}
        </Text>
      </View>
      <View
        style={styles.footer}
      >
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
              <Text style={styles.modalText}>Added!</Text>
            </View>
          </BlurView>
        </Modal>

        <ScrollView
          keyboardDismissMode='on-drag'
          style={styles.scrollView}
          behavior={Platform.OS === "ios" ? "height" : "height"}
          keyboardVerticalOffset={responsiveWidth(400)}
        >
          <View
            style={{
              ...styles.inputTextContainer,
              height: responsiveHeight(35),
              width: responsiveWidth(90),
              marginTop: responsiveHeight(6)
            }}>
            <TextInput
              value={text}
              placeholder={"Type your question here..."}
              multiline={true}
              numberOfLines={8}
              maxLength={300}
              placeholderTextColor='white'
              secureTextEntry={false}
              style={{
                color: 'white',
                textAlign: 'justify',
                fontSize: responsiveFontSize(20),
                fontWeight: 'bold'
              }}
              autoCapitalize="sentences"
              onChangeText={setText}
            />
          </View>
          {
            text?.length >= 300 &&
            <CharacterLimit
              errorMessage={'Max characters - 300'} />
          }
          <View style={styles.button}>
            <ButtonQApp
              disabled={disableButton}
              title={'Add'}
              onPress={onPressPostQuestin}
              height={responsiveHeight(8)}
              color={disableButton === true ? '#f38375' : '#52b788'}
              color2={disableButton === true ? '#f38375' : '#52b788'}
            />
          </View>
        </ScrollView>
      </View >
    </View >
  );
};

export default AddQ;

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: "center",
    flexDirection: 'column',
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  input: {
    height: 48,
    borderRadius: 5,
    orvflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,

  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },

  container: {
    flex: 1,
    backgroundColor: '#f25c54'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: responsiveWidth(8),
    // paddingBottom: 20,

  },
  footer: {
    flex: 5,
    backgroundColor: '#f7b267',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(50),
    paddingTop: responsiveHeight(6),
    top: responsiveHeight(1.5)
  },
  button: {
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 5,
    },

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
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  inputText: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    padding: 10,
    paddingTop: 15,
    color: '#e32f45',
    fontSize: 20,
    borderWidth: 0.5,
    borderColor: '#FAF1F0',
    // minHeight: height * 0.15,
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,

  },
  modalView: {
    // margin: 20,
    backgroundColor: '#e32f45',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    fontSize: 18,
    color: 'white'

  },
  inputTextContainer: {
    height: responsiveHeight(60),
    width: responsiveWidth(70),
    // marginTop: responsiveWidth(10),
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
    padding: 8,
    margin: 10,
    // paddingTop: 5,
    color: '#e32f45',
    // borderWidth: 0.5,
    borderColor: '#FA7465',
    // minHeight: height * 0.15,
    backgroundColor: '#f79d65',
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 8,
    overflow: 'visible',
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
});