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
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { disableErrorHandling } from 'expo';


const AddQ = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const { height } = Dimensions.get("window");
  const { colors } = useTheme();
  const [disableButton, setDisableButton] = useState(true)
  const [todos, setTodos] = useState([]);
  const [addData, setAddData] = useState('');
  const { onPressAddQuestion, questions, question, onPressNextQuestion } = useContext(QuestionsContext)

  useEffect(() => {
    if (text !== '') {
      setDisableButton(false)
    }
    else setDisableButton(true)
  }, [text])




  return (
    // <View style={{ flex: 1 }}>
    //   <View style={styles.formContainer}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder='Add a New Todo'
    //       placeholderTextColor={'white'}
    //       onChangeText={(heading) => setAddData(heading)}
    //       value={addData}
    //       underlineColorAndroid='transparent'
    //       autoCapitalize='none'
    //     />
    //     <TouchableOpacity style={styles.button} onPress={addTodo}>
    //       <Text style={styles.buttonText}>Add</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <FlatList
    //     data={todos}
    //     numColumns={1}
    //     renderItem={({ item }) => (
    //       <View>
    //         <Pressable
    //           style={styles.container}
    //           onPress={() => console.log('hello')}
    //         >
    //           <FontAwesome
    //             name='trash-o'
    //             color='red'
    //             onPress={() => deleteTodo(item)}
    //             style={styles.todIcon}
    //           />
    //           <View style={styles.innerContainer}>
    //             <Text style={styles.innerHeading}>
    //               {item.heading[0].toUpperCase() + item.heading.slice(1)}
    //             </Text>
    //           </View>
    //         </Pressable>
    //       </View>
    //     )}
    //   />
    // </View>


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
            fontWeight: 'bold',
            alignSelf: 'center'
          }}>{'Yes/No Question:'}
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
              disabled={disableButton}
              style={styles.signIn}
              onPress={() => onPressAddQuestion({ text })
              }
            >
              <LinearGradient
                colors={disableButton === true ? ['grey', 'pink'] : ['#e32f45', 'pink']}
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
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
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
    marginTop: 50,

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