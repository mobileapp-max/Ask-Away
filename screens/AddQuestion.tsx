import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  Pressable,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { useContext } from 'react';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../scripts/constants';
import { CharacterLimit } from '../components/character-limit/character-limit';
import { BlurView } from 'expo-blur';
import ButtonQApp from '../components/buttonQApp';
import { UserContext } from '../contexts/user-context-provider';
import fonts from '../scripts/fonts';
import { Ionicons } from '@expo/vector-icons';
import ModalToDelete from '../components/modalToDelete';

const AddQ = ({ navigation }) => {

  const inputRef = useRef(null);
  const handleButtonPress = () => {
    inputRef.current.focus();
  };
  const { user } = useContext(UserContext)
  const [text, setText] = useState('')
  const [disableButton, setDisableButton] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const { onPressAddQuestion } = useContext(QuestionsContext)
  const onPressInitiateAddQuestin = () => {
    setText('')
    onPressAddQuestion({ question: text?.trim(), email: user?.email, user_id: user?.uid })
    setModalVisible(true)
    setTimeout(() => {
      setModalVisible(false)
    }, 1000);
  }

  useEffect(() => {
    if (text !== '') {
      setDisableButton(false)
    }
    else setDisableButton(true)
  }, [text])


  function handleKeyPress(e) {
    // Log the key code of the pressed key
    // console.log('Key pressed:', e.nativeEvent.key);

    // Prevent the user from typing the letter 'a'
    if (e.nativeEvent.key === 'Return') {
      e.preventDefault();
    }
  }

  const [editedText, setEditedText] = useState('')

  function removeLineBreaks(str) {
    return str.replace(/\n/g, " ").replace(/\s+/g, " ");
  }
  const newString = removeLineBreaks(text);

  // console.log(newString)

  useEffect(() => {
    function removeLineBreaks(text) {
      return
    }
  }, [text])


  const handleOnSubmitEditing = () => {
    // Dismiss the keyboard when the return key is pressed
    Keyboard.dismiss();
  };


  const handleClearText = () => {
    setText('');
  };

  const renderClearButton = () => {
    if (text.length > 0) {
      return (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: responsiveHeight(34),
            left: responsiveWidth(80),
          }}
          onPress={handleClearText}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close-circle'}
            size={30}
            color="#f25c54"
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onPressTrashCan = () => {
    setDeleteModalVisible(!deleteModalVisible)
  }

  const onPressDeleteQuestionNo = () => {
    setDeleteModalVisible(false)
  }

  const onPessDeleteQuestionYes = () => {
    setDeleteModalVisible(false)
    onPressInitiateAddQuestin()
  }



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
        <ModalToDelete
          text={'Add Question?'}
          text2={text}
          deleteModalVisible={deleteModalVisible}
          onPressDeleteQuestionNo={onPressDeleteQuestionNo}
          onPessDeleteQuestionYes={onPessDeleteQuestionYes}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <BlurView
            intensity={9}
            style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {'Question Added!'}
              </Text>
            </View>
          </BlurView>
        </Modal>
        <ScrollView
          keyboardDismissMode='on-drag'
          style={styles.scrollView}
          behavior={Platform.OS === "ios" ? "height" : "height"}
          keyboardVerticalOffset={responsiveWidth(400)}
        >
          <Pressable
            onPress={handleButtonPress}
            style={{
              ...styles.inputTextContainer,
              height: responsiveHeight(40),
              width: responsiveWidth(90),
              marginTop: responsiveHeight(6),
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <TextInput
              onKeyPress={handleKeyPress}
              onSubmitEditing={handleOnSubmitEditing}
              ref={inputRef}
              value={newString}
              placeholder={"Type your question..."}
              multiline={true}
              maxLength={300}
              placeholderTextColor='white'
              secureTextEntry={false}
              style={{
                ...fonts.note,
                color: 'white',
                fontSize: text == '' ? responsiveFontSize(35) : responsiveFontSize(20),
                fontWeight: 'bold',
              }}
              autoCapitalize="sentences"
              onChangeText={setText}
            />
            {renderClearButton()}
          </Pressable>
          {
            text?.length >= 300 &&
            <CharacterLimit
              errorMessage={'Character limit - 300'} />
          }
          <View style={styles.button}>
            {
              disableButton === true ?
                null
                :
                <ButtonQApp
                  fontSize={responsiveFontSize(35)}
                  disabled={disableButton}
                  title={'Add'}
                  onPress={onPressTrashCan}
                  height={responsiveHeight(8)}
                  color={disableButton === true ? '#f38375' : '#52b788'}
                  color2={disableButton === true ? '#f38375' : '#52b788'}
                />
            }
          </View>
        </ScrollView>
      </View >
    </View >
  );
};

export default AddQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f25c54'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: responsiveWidth(8),
  },
  footer: {
    flex: 4.5,
    backgroundColor: '#f7b267',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text_header: {
    ...fonts.note,
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
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  modalView: {
    backgroundColor: '#52b788',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 10,
    color: '#e32f45',
    borderColor: '#FA7465',
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