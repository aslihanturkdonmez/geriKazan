import React, {useState, useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Login, SignUp, Home, Favorites, Messages, AddProduct, ProductDetail, MyProducts, Account, Profile, Settings} from './screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getFavs, setFavs } from './store/actions/FavoritesActions';
import { authentication, database } from './services';
import { setUser } from './store/actions/UserAction';

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
            
        case 'Favorites':
            iconName = focused ? 'md-heart-sharp' : 'md-heart-outline';
            break;
        case 'Messages':
            iconName= focused ? 'md-chatbox' : 'md-chatbox-outline'
            break;
        case 'AccountStack':
            iconName=focused ? 'person-circle-sharp' : 'person-circle-outline'
            break;
        case 'BottomAddProduct':
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline'
            break;
    }

    return <Ionicons name={iconName} size={size} color={color} />
  };

const Router = () => {
    const user=authentication.getCurrentUser();
    const [userFlag, setUserFlag] = useState(user);

    const dispatch = useDispatch();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        setCurrentUser();
        getFavs();

        return subscriber;
    }, [user]);
    
    const onAuthStateChanged = (user) => {
        setUserFlag(user);
    }
    
    const setCurrentUser = async() => {
        const {_data: userFromDb}= await database.user.getUser(user?.uid);
        dispatch(setUser(userFromDb));
    }

    
    const getFavs = async() => {
        const favs=await database.user_favs.getUserFavs(user?.uid);
        dispatch(setFavs(favs));
    }

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        )
    }

    const AccountStack = () => {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Account' component={Account} />
                <Stack.Screen name='MyProducts' component={MyProducts} />
                <Stack.Screen name='Profile' component={Profile} />
                <Stack.Screen name='Settings' component={Settings} />
            </Stack.Navigator>
        )
    }

    const AddProductBase = () => <View style={{ flex: 1, backgroundColor: "red" }} />


    const HomeStack = () => {
        return (
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='HomeScreen' component={Home} />
                <Stack.Screen name='ProductDetail' component={ProductDetail} />

            </Stack.Navigator>
        )
    }

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
                    component={HomeStack} 
                />
                <Tab.Screen 
                    name='Favorites' 
                    component={Favorites} 
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
                    name='AccountStack' 
                    component={AccountStack} 
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
            { !userFlag ?
                <AuthStack />
            :
                <MainNavigator />
            }
        </NavigationContainer>
     );
}
 
export default Router;