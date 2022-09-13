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
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper';
import { useContext } from 'react';
import { QuestionsContext } from '../contexts/questions-context-provider';





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
        <Animatable.Text style={styles.text_header} animation='zoomInUp'>Add your question!</Animatable.Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >

        <View style={styles.action}>

          <TextInput
            value={title}

            placeholder="Title"
            multiline={true}
            maxLength={150}
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text, fontSize: 30
            }]}
            autoCapitalize="words"
            onChangeText={(newTitle) => setTitle(newTitle)}
          />

        </View>



        <View style={styles.action}>
          <TextInput
            value={text}
            placeholder={"Question (optional)"}
            multiline={true}
            numberOfLines={5}
            maxLength={500}
            placeholderTextColor="#666666"
            secureTextEntry={false}
            style={[styles.textInput, {
              color: colors.text, minHeight: height * 0.15,
            }]}
            autoCapitalize="sentences"
            onChangeText={(newText) => setText(newText)}
          />
        </View>

        <View style={styles.mask}>
          <TouchableOpacity
            onPress={() => setIsHidden(!isHidden)}
          >
            <FontAwesome5 name="mask" size={24} color={isHidden ? '#e32f45' : "grey"} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5 }}>{isHidden ? 'Anonymous' : 'Username'}</Text>

        </View>
        <Text>Post Anonymously</Text>

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
              }]}>Post Question</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    flex: 7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
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
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
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
  mask: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  }
});