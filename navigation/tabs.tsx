import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Pressable, } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AddQ from '../screens/AddQuestion';
import { LogInStackScreen } from './logInSignUpNav'
import { FontAwesome } from '@expo/vector-icons';
import QuestionScreen from '../screens/QuestionScreen2';
import { responsiveHeight, responsiveWidth } from '../scripts/constants';
import { Octicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const CustomTabButton = (props) => {
    const children = props?.children
    const onPress = props?.onPress
    const currentScreen = props?.currentScreen
    const startImageRotation = props?.onPress
    const [plusSign, setplusSign] = useState(new Animated.Value(0));
    const rotatePlusSign = () => {
        Animated.timing(plusSign, {
            toValue: 0.25,
            duration: 500,
            // easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        setTimeout(() => {
            setplusSign(new Animated.Value(0))
        }, 500);
    }
    const onPressPlusSign = () => {
        rotatePlusSign()
        onPress()
    }

    return <Pressable
        style={{
            top: -14,
            justifyContent: "center",
            alignItems: 'center',
            ...style.shadow,
        }}
        onPress={onPressPlusSign}
    >
        <Animated.View style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            // borderWidth: responsiveWidth(1),
            borderColor: '#f7b267',
            backgroundColor:
                currentScreen === 'Profile2' ? '#f7b267' : '#f25c54',
            transform:
                [
                    {
                        rotate: plusSign.interpolate(
                            {
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg'],
                            }
                        )
                    }
                ]
        }}>
            {children}
        </Animated.View>
    </Pressable>
}

const Tabs = (props) => {

    const ProfileScreen = () => <LogInStackScreen />

    return (
        // <RootStackScree>
        <Tab.Navigator
            screenOptions={{
                activeTintColor: "#f7b267",
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    // bottom: responsiveHeight(2),
                    // left: responsiveWidth(6),
                    // right: responsiveWidth(6),
                    elevation: 0,
                    backgroundColor: '#f25c54',
                    // borderWidth: 3,
                    // borderColor: '#f7b267',
                    // borderRadius: 25,
                    justifyContent: "center",
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: responsiveHeight(7.5),
                    // top: props?.isTabsVisible ? undefined : -100,
                    shadowColor: "#f25c54",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 5

                }

            }}>
            {/* <Tab.Screen name="Questions" component={QScreen} /> */}

            <Tab.Screen name="Main" component={QuestionScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: 'center', top: responsiveHeight(1.5), height: responsiveHeight(8) }}>
                        {/* <FontAwesome
                            name="question-circle"
                            size={45}
                            color={focused ? 'white' : '#f7b267'}
                        /> */}
                        <Octicons
                            name="question"
                            size={40}
                            color={focused ? 'white' : '#f7b267'}
                        />
                        {/* <Text style={{ color: focused ? '#f7b267' : '#f25c54' }}>Questions</Text> */}
                    </View>
                )
            }} />
            <Tab.Screen name="Profile2" component={AddQ}
                options={{
                    tabBarIcon: ({ focused }) => (

                        <View
                            style={{ alignItems: "center", justifyContent: 'center', }}>
                            <Entypo
                                name="plus"
                                size={80}
                                color={
                                    focused ? 'white' :
                                        '#f7b267'}
                            />
                        </View>

                    ),
                    tabBarButton: (props) => {
                        return <CustomTabButton {...props} />
                    }
                }}
            />
            <Tab.Screen name="Profile3" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: 'center', top: responsiveHeight(1.5), height: responsiveHeight(8) }}>
                            {/* <Icon
                                name="person-circle"
                                size={45}
                                color={focused ? 'white' : '#f7b267'}
                            /> */}
                            <Octicons
                                name="feed-person"
                                size={40}
                                color={focused ? 'white' : '#f7b267'}
                            />
                            {/* <Text style={{ color: focused ? '#f7b267' : '#f25c54' }}>Profile</Text> */}
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: "#f7b267",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5

    }
})

export default Tabs;