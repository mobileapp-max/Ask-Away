import React, { useState } from 'react';
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

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';
import { useContext } from 'react';
import { QuestionsContext } from '../contexts/questions-context-provider';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../scripts/constants';
import { CharacterLimit } from '../components/character-limit/character-limit';
import SwitchSelector from 'react-native-switch-selector';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const AddQ = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const { onPressAddQuestion } = useContext(QuestionsContext)
  const { height } = Dimensions.get("window");
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#e32f45' barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Text style={styles.text_header} animation='zoomInUp'>
          {'Add Question'}
        </Animatable.Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView
          keyboardDismissMode='on-drag'
          style={styles.scrollView}
          behavior={Platform.OS === "ios" ? "height" : "height"}
          keyboardVerticalOffset={responsiveWidth(400)}
        >
          <Text style={{
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            padding: 10,
            paddingBottom: 5,
            color: '#e32f45',
            fontSize: responsiveFontSize(20),
            fontWeight: 'bold'
          }}>{'Your Yes/No question:'}
          </Text>
          <TextInput
            value={text}
            placeholder={"Type here..."}
            multiline={true}
            numberOfLines={8}
            maxLength={300}
            placeholderTextColor='#C47B76'
            secureTextEntry={false}
            style={[
              styles.inputText, {
                minHeight: responsiveHeight(15),
                minWidth: responsiveWidth(90)
              }]}
            autoCapitalize="sentences"
            onChangeText={setText}
          />
          {
            text?.length >= 300 &&
            <CharacterLimit
              errorMessage={'Max characters - 300'} />
          }
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => onPressAddQuestion({
                question: {
                  "id": "c82eaca0-f915-4c52-a6c7-010b731f46786",
                  text,
                  title,
                  "likes": 0
                }
              })}
            >
              <LinearGradient
                colors={['#e32f45', 'pink']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>{'Post Question'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View >
    </View >
  );
};

export default AddQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e32f45'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 9,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(30),
    alignSelf: 'center'
  },
  button: {
    alignItems: 'center',
    marginTop: 50
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
});