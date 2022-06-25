import React, {useState, useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Login, SignUp, Home, Favorites, Messages, AddProduct, ProductDetail, MyProducts, Account, Profile, Settings, MessageDetail, About, Report, Feedback} from './screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getFavs, setFavs } from './store/actions/FavoritesActions';
import { authentication, database } from './services';
import { setUser } from './store/actions/UserAction';
import { Dimensions, LogBox, View } from 'react-native'
import { storage } from './utils';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Icon, Image } from './components';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    "Can't perform a React state update on an unmounted component."
]);

/* const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background:'#d0e1d0',
    },
  }; */

const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();

const giveIcon = ({ route, focused }) => {
    let iconName;
    let size=25;
    let color='#466f4f';

    switch (route.name) {
        case 'Home':
            iconName = focused ? 'md-home-sharp' : 'md-home-outline';
            break; 
            
        case 'Favorites':
            iconName = focused ? 'md-heart-sharp' : 'md-heart-outline';
            size=27;
            break;
        case 'Messages':
            iconName= focused ? 'md-chatbox' : 'md-chatbox-outline';
            break;
        case 'Account':
            iconName=focused ? 'person-sharp' : 'person-outline';
            break;
        case 'BottomAddProduct':
            iconName = focused ? 'add-circle-sharp' : 'md-add-circle';
            color = !focused ? '#a1c4a1' : color;
            size = 45;
            break;
    }

    return (
            <Ionicons name={iconName} size={size} color={color} />
        )
  };

const Router = () => {
    const user=authentication.getCurrentUser();
    const [userFlag, setUserFlag] = useState(user);
    const [firstRun, setFirstRun] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        setCurrentUser();
        getFavs();
        userFirstRun();

        return subscriber;
    }, [user, firstRun]);
    
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

    const userFirstRun = async() => {
        const result=await storage.getIsUserFirstRun();
        console.log(result);
        setFirstRun(result);
    }

    const AddProductBase = () => <View style={{ flex: 1, backgroundColor: "red" }} />

    const AppTabNavigator = () => {
        return (
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    headerShown:false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={{ alignItems:'center', justifyContent:'center', }}>
                                {
                                    giveIcon({ route, focused, color, size })
                                }
                            </View>
                        )},
                    tabBarShowLabel: false,
                    tabBarIconStyle:{
                        backgroundColor:'red',
                     },
                    tabBarStyle:{
                        elevation:15,
                        backgroundColor:'#fff',
                        borderTopLeftRadius:25,
                        borderTopRightRadius:25,
                        height:53,
                        shadowColor:'#000',
                        paddingHorizontal:20,
                        shadowRadius: 25,

                     },
                })}
            >
                <Tab.Screen 
                    name='Home' 
                    component={Home} 
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
                    name='Account' 
                    component={Account} 
                />
            </Tab.Navigator>
        )
    }
    const slides = [
        {
            key:1,
            image: require('../src/resources/assets/1.png')
        },
        {
            key:2,
            image: require('../src/resources/assets/2.png')
        },
        {
            key:3,
            image: require('../src/resources/assets/3.gif')
        },
        {
            key:4,
            image: require('../src/resources/assets/4.png')
        },
    ]

    const renderItem = ({item}) => {
        return (
            <Image 
                source={item.image}
                resizeMode={'cover'}
                style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}
            />
        )

    }

    const onDone = () => {
        storage.setIsUserFirstRun();
        setFirstRun(true);
    }

    const renderNextButton = () => {
        return (
            <Icon
              icon="arrow-forward-circle-outline"
              color="rgba(255, 255, 255, .9)"
              size={40}
            />
        );
    };
    
    const renderDoneButton = () => {
        return (
            <Icon
              icon="md-checkmark"
              color="rgba(255, 255, 255, .9)"
              size={40}
            />
        );
    };

    const IntroStack = () => {
        return(
            <AppIntroSlider 
                renderItem={renderItem} 
                data={slides}
                onDone={onDone}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}
            />
        )
    }


    const AppStack = () => {
        return (
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='HomeTab' component={AppTabNavigator} />
                <Stack.Screen name='MyProducts' component={MyProducts} />
                <Stack.Screen name='Profile' component={Profile} />
                <Stack.Screen name='Settings' component={Settings} />
                <Stack.Screen name='ProductDetail' component={ProductDetail} options={{presentation:'modal'}} />
                <Stack.Screen name='MessageDetail' component={MessageDetail} />
                <Stack.Screen 
                    name='AddProduct' 
                    component={AddProduct} 
                    options={{
                        headerTitle:'Ürün Ekle',
                    }}
                />

                <Stack.Screen name='About' component={About} />
                <Stack.Screen name='Report' component={Report} />
                <Stack.Screen name='Feedback' component={Feedback} />

            </Stack.Navigator>
        )
    }

    return ( 
        <NavigationContainer /* theme={MyTheme} */>

            { !firstRun ? 
                <IntroStack />
            :
                !userFlag ?
                    <AuthStack />
                :
                    <AppStack />
            }
        </NavigationContainer>
     );
}
 
export default Router;