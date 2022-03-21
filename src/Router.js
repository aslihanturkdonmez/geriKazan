import React, {useState} from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Login, SignUp, Home} from './screens';


/* const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background:'#d0e1d0',
    },
  }; */

const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();

const Router = () => {
    const [auth, setAuth] = useState(false);

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        )
    }



    return ( 
        <NavigationContainer /* theme={MyTheme} */>
            { auth ?
                <AuthStack />
            :
                <Tab.Navigator screenOptions={{headerShown: false}}>
                    <Tab.Screen name='Home' component={Home} />
                </Tab.Navigator>
            }
        </NavigationContainer>
     );
}
 
export default Router;