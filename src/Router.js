import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Login} from './screens';


const Stack=createNativeStackNavigator();
//const Tab=createBottomTabNavigator();

const Router = () => {

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={Login} />
            </Stack.Navigator>
        )
    }

    return ( 
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
     );
}
 
export default Router;