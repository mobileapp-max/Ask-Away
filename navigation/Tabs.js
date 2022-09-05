import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import QScreen from "../screens/QScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import AddQ from '../screens/AddQ';
// import { mdiPlusCircleOutline } from '@mdi/js'



const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
            screenOptions={{
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
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: 'center', top: 10 }}>
                        <Icon
                            name="ios-home"
                            size={26}
                            color={'#e32f45'}
                        />
                        <Text
                            style={{ color: focused ? '#e32f45' : '#748c94' }}>HOME</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Profile2" component={AddQ}
                options={{
                    presentation: 'modal',
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="pluscircleo"
                            size={26}
                        // color={'#e32f45'}
                        />

                    ),
                    tabBarButton: (props) => (
                        <CustomTabButton {...props} />
                    )
                }}
            />
            <Tab.Screen name="Profile3" component={ProfileScreen} />
        </Tab.Navigator>
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