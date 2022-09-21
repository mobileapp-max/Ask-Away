import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import QScreen from "../screens/ListOfQuestions";
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import AddQ from '../screens/AddQuestion';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackScreen } from './navigation';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


// import { mdiPlusCircleOutline } from '@mdi/js'

// const RootStack = createNativeStackNavigator();
// const RootStackScree = () => {
//     <RootStack.Navigator>
//         return
//     </RootStack.Navigator>
// }

const Tab = createBottomTabNavigator();

const CreateNewPlaceholder = () => <View style={{ flex: 1, backgroundColor: 'red' }} />

const CustomTabButton = (props) => {
    const children = props?.children
    const onPress = props?.onPress
    const currentScreen = props?.currentScreen

    return <TouchableOpacity
        style={{
            top: -30,
            justifyContent: "center",
            alignItems: 'center',
            ...style.shadow,
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: currentScreen === 'Profile2' ? 'gold' : '#e32f45'

        }}>
            {children}
        </View>
    </TouchableOpacity>
}

const Tabs = (props) => {
    return (
        // <RootStackScree>
        <Tab.Navigator

            screenOptions={{
                activeTintColor: "gold",
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderWidth: 2,
                    borderColor: 'red',
                    borderRadius: 15,
                    height: 90,
                    top: props?.isTabsVisible ? undefined : -100,
                    ...style.shadow
                }

            }}>
            {/* <Tab.Screen name="Questions" component={QScreen} /> */}

            <Tab.Screen name="Main" component={MainStackScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: 'center', top: 10 }}>
                        <AntDesign
                            name="questioncircle"
                            size={40}
                            color={focused ? 'gold' : '#e32f45'}
                        />
                        <Text
                            style={{ color: focused ? 'gold' : '#e32f45' }}>Questions</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Profile2" component={AddQ}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: 'center' }}>
                            <Entypo
                                name="plus"
                                size={65}
                                color={focused ? 'gold' : 'white'}
                            />
                        </View>
                    ),
                    tabBarButton: (props) => {
                        // console.log('props', props);
                        return <CustomTabButton {...props} />
                    }
                }}
            // listeners={() => ({
            //     tabPress: event => {
            //         event.preventDefault();
            //     }
            // })}
            />
            <Tab.Screen name="Profile3" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: 'center', top: 10 }}>
                            <Icon
                                name="person-circle"
                                size={40}
                                color={focused ? 'gold' : '#e32f45'}
                            />
                            <Text
                                style={{ color: focused ? 'gold' : '#e32f45' }}>Profile</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
        // </RootStackScree>
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: "#e32f45",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5

    }
})

export default Tabs;