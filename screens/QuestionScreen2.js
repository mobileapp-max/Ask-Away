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
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const QuestionScreen = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const { onPressAddQuestion } = useContext(QuestionsContext)
  const { height } = Dimensions.get("window");
  const { colors } = useTheme();
  const [answerWidth, setAnswerWidth] = useState(45)


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor='#e32f45' barStyle="light-content" />
        <Text style={styles.text_header}>
          {'Questions'}
        </Text>
      </View>
      <ScrollView>
        <View style={[
          styles.inputText, {
            minHeight: responsiveHeight(15),
            minWidth: responsiveWidth(90)
          }]}>
          {/* <Text style={{
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            padding: 10,
            paddingBottom: 5,
            color: '#e32f45',
            fontSize: responsiveFontSize(20),
            fontWeight: 'bold'
          }}>{'Your Yes/No question:'}
          </Text> */}
          <Text
            style={{
              textAlign: 'center',
              color: '#e32f45',
              fontSize: 20,
              paddingHorizontal: 15,
            }}
          >{`I wish I could remember that first day, First hour, first moment of your meeting me, If bright or dim the season, it might be Summer or Winter for aught I can say; So unrecorded did it slip away, So blind was I to see and to foresee, So dull to mark the budding of my tree That would not blossom yet for man`}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} ><MaterialIcons name="arrow-forward-ios" size={40} color='#e32f45' style={{ transform: [{ rotateY: '180deg' }], }} /><Text>{'Back'}</Text></TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} ><Text>{'Next'}</Text><MaterialIcons name="arrow-forward-ios" size={40} color='#e32f45' /></TouchableOpacity>
          </View>
        </View>
        <View style={{
          marginTop: 30,
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
              onPress={() => setAnswerWidth(answerWidth + 5)}
              style={{
                backgroundColor: "#e32f45",
                height: responsiveHeight(7),
                width: responsiveWidth(answerWidth),
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}><Text style={{ fontWeight: 'bold', color: "white" }}>{'Yes'}</Text></TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAnswerWidth(answerWidth - 5)}
              style={{
                backgroundColor: "gold",
                height: responsiveHeight(7),
                width: responsiveWidth(90 - answerWidth),
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
              }}><Text style={{ fontWeight: 'bold', color: "white" }}>{'No'}</Text></TouchableOpacity>

          </View>
        </View>
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
    paddingBottom: 20,
    backgroundColor: '#e32f45',
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
  inputText: {
    // flex: 1,
    margin: responsiveWidth(10),
    alignSelf: 'center',
    padding: 10,
    paddingTop: 15,
    color: '#e32f45',
    fontSize: 20,
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
});