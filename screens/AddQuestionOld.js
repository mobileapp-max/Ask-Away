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

const AddQ = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const { onPressAddQuestion } = useContext(QuestionsContext)
  const { height } = Dimensions.get("window");
  const { colors } = useTheme();
  const toggleSwitch = () => setIsHidden(previousState => !previousState);




  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#e32f45' barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Text style={styles.text_header} animation='zoomInUp'>
          {'Add your question!'}
        </Animatable.Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView
          keyboardDismissMode='on-drag'
          style={styles.scrollView}
        >
          <View
          // style={{ top: responsiveWidth(-40) }}
          // behavior={Platform.OS === "ios" ? "height" : "height"}
          // keyboardVerticalOffset={responsiveWidth(400)}
          >
            <Text style={{
              flex: 1,
              marginTop: Platform.OS === 'ios' ? 0 : -12,
              padding: 10,
              paddingTop: 15,
              color: '#e32f45',
              fontSize: responsiveFontSize(20),
              fontWeight: 'bold'
            }}>What type?</Text>
            <SwitchSelector
              initial={1}
              onPress={value => console.log("")}
              textColor={'red'}
              selectedColor={'white'}
              buttonColor={"#e32f45"}
              backgroundColor={'white'}
              // borderColor={'purple'}
              // hasPadding
              bold={true}
              options={[
                { label: "Yes/No", value: "0", },
                { label: "Response", value: "1", } //images.masculino = require('./path_to/assets/img/masculino.png')
              ]}
              testID="gender-switch-selector"
              accessibilityLabel="gender-switch-selector"
              style={styles.switchSelector}
            />

            <View style={{
              flexDirection: 'row',
              marginTop: 15,
              paddingBottom: 5,
            }}>

              <TextInput
                value={title}
                placeholder="Title..."
                multiline={true}
                maxLength={150}
                placeholderTextColor="#C47B76"
                style={styles.inputText}
                autoCapitalize="words"
                onChangeText={setTitle}
              />
            </View>
            {
              title?.length >= 150 &&
              <CharacterLimit
                errorMessage={'Max characters - 150'}
              />
            }

            <View style={{
              flexDirection: 'row',
              marginTop: 10,
              paddingBottom: 5,
            }}>
              <TextInput
                value={text}
                placeholder={"Question (optional)..."}
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
            </View>
            {
              text?.length >= 300 &&
              <CharacterLimit
                errorMessage={'Max characters - 300'} />
            }

            <View style={styles.privacyToggleSwitch}>
              <Switch
                value={isHidden}
                onValueChange={toggleSwitch}
                disabled={false}
                ios_backgroundColor={'pink'}
                thumbColor={isHidden ? '#e32f45' : "white"}
                trackColor={{ false: 'green', true: "pink" }}
              />
              <Text style={{ marginLeft: responsiveWidth(4) }}>{'?User/Anonymous?'}</Text>
            </View>


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
          </View >
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
    paddingBottom: 20
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
  text_footer: {
    color: '#05375a',
    fontSize: 23
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 20
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
  privacyToggleSwitch: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  switchSelector:
  {
    paddingTop: 10,
    width: responsiveWidth(90),
    alignSelf: 'center',
    shadowColor: "#e32f45",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
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