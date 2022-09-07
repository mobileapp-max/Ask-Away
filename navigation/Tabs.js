import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import QScreen from "../screens/QScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import AddQ from '../screens/AddQ';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackScreen } from './navigation';
// import { mdiPlusCircleOutline } from '@mdi/js'

// const RootStack = createNativeStackNavigator();
// const RootStackScree = () => {
//     <RootStack.Navigator>
//         return
//     </RootStack.Navigator>
// }

const Tab = createBottomTabNavigator();

const CreateNewPlaceholder = () => <View style={{ flex: 1, backgroundColor: 'red' }} />

const CustomTabButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: "center",
            alignItems: 'center',
            ...style.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = () => {
    return (
        // <RootStackScree>
        <Tab.Navigator
            screenOptions={{
                activeTintColor: "blue",
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...style.shadow
                }

            }}>
            {/* <Tab.Screen name="Questions" component={QScreen} /> */}

            <Tab.Screen name="Main" component={MainStackScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: 'center', top: 10 }}>
                        <Icon
                            name="ios-home"
                            size={26}
                        // color={'#e32f45'}
                        />
                        <Text
                            style={{ color: focused ? '#e32f45' : '#748c94' }}>HOME</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Profile2" component={AddQ}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/images/plus.png')}
                            style={{
                                top: -2,
                                width: 80,
                                height: 80,
                                tintColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabButton {...props} />
                    )
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
                                name="user"
                                size={26}
                                color={'#e32f45'}
                            />
                            <Text
                                style={{ color: focused ? '#e32f45' : '#748c94' }}>HOME</Text>
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
        shadowColor: "#7F5DF0",
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