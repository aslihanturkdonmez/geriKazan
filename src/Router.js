import React, {useState, useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Login, SignUp, Home, Account, Favorities, Messages, AddProduct} from './screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

/* const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background:'#d0e1d0',
    },
  }; */

const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();

const giveIcon = ({ route, focused, color, size }) => {
    let iconName;

    switch (route.name) {
        case 'Home':
            iconName = focused ? 'md-home-sharp' : 'md-home-outline';
            break; 
            
        case 'Favorities':
            iconName = focused ? 'md-heart-sharp' : 'md-heart-outline';
            break;
        case 'Messages':
            iconName= focused ? 'md-chatbox' : 'md-chatbox-outline'
            break;
        case 'Account':
            iconName=focused ? 'person-circle-sharp' : 'person-circle-outline'
            break;
        case 'BottomAddProduct':
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline'
            break;
    }

    return <Ionicons name={iconName} size={size} color={color} />
  };

const Router = () => {
    const [user, setUser] = useState();

    const onAuthStateChanged = (user) => {
        setUser(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
      }, []);

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        )
    }

    const AddProductBase = () => <View style={{ flex: 1, backgroundColor: "red" }} />


    const AppTabNavigator = () => {
        return (
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    headerShown:false,
                    tabBarIcon: ({ focused, color, size }) => giveIcon({ route, focused, color, size }),
                    tabBarShowLabel: false,
                })}
            >
                <Tab.Screen 
                    name='Home' 
                    component={Home} 
                />
                <Tab.Screen 
                    name='Favorities' 
                    component={Favorities} 
                />
                <Tab.Screen 
                    name='BottomAddProduct' 
                    component={AddProductBase}
                    listeners={({navigation}) => ({
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate("AddProduct")
                        }
                    })}

                />
                <Tab.Screen 
                    name='Messages' 
                    component={Messages} 
                />
                <Tab.Screen 
                    name='Account' 
                    component={Account} 
                />
            </Tab.Navigator>
        )
    }

    const MainNavigator = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen 
                    name='main' 
                    component={AppTabNavigator}  
                    options={{
                        headerShown:false,
                    }}
                />
                <Stack.Screen 
                    name='AddProduct' 
                    component={AddProduct} 
                    options={{
                        headerTitle:'Ürün Ekle',
                        headerShown:false,
                    }}
                />
            </Stack.Navigator>
        )
    }

    return ( 
        <NavigationContainer /* theme={MyTheme} */>
            { !user ?
                <AuthStack />
            :
                <MainNavigator />
            }
        </NavigationContainer>
     );
}
 
export default Router;