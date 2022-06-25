import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text, Icon, TextInput, Image, Header, Menu } from '../../../components';
import styles from './Profile.style';
import ImagePicker from 'react-native-image-crop-picker';
import {database} from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import {setUser as setUserAction} from '../../../store/actions/UserAction';


const InputFieldComponent = ({fieldTitle, value, onChangeText, styleContainer, styleTitle, styleInputContainer, styleInput}) => {
    return (
        <View style={styleContainer}>
            <Text style={styleTitle}>{fieldTitle}</Text>
            <View style={styleInputContainer}>
                <TextInput 
                    value={value}
                    onChangeText={onChangeText}
                    style={styleInput}
                />
            </View>
        </View>
    )
}


const Profile = ({route, navigation}) => {

    const mainMenu = [
        {id:1, title: 'Profilim', icon:'person-outline', onPress: () => {handleNavigate('Profile', userInformation)}},
        {id:2, title: 'Ürünlerim', icon:'cart-outline', onPress: () => {handleNavigate('MyProducts', userInformation)}},
        {id:3, title: 'Ayarlar', icon:'settings-outline', onPress: () => {handleNavigate('Settings', userInformation)}},
        
    ]

    const handleNavigate =(route, params) => {
        navigation.navigate(route, params);
    }

    const dispatch = useDispatch();
    const userInfo=useSelector(state => state.user);
    const [userInformation, setUserInformation] = useState(userInfo);

    return (  
        <View style={styles.container}>
            <Header styleContainer={{justifyContent: 'space-between', }}>
                <Pressable onPress={() => navigation.goBack()} style={{marginHorizontal:15,}}>
                    <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                    />
                </Pressable>
                <Text style={{margin:8, fontSize:20, alignSelf: 'center', fontWeight:'bold'}}>Profilim</Text>
                <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                        color={'#fff'}
                        style={{marginHorizontal:15,}}
                />
            </Header>
            <View style={{paddingHorizontal:20, backgroundColor:'#fff', marginBottom:20, paddingBottom:10,}}>
                <View style={styles.profilePictureContainer}>
                    
                    { userInformation.profilePicture ?
                        <View style={{backgroundColor:'red', borderRadius:60, elevation:8,}}>
                            <Image 
                            style={styles.profilePic}
                            source={{uri: userInformation.profilePicture}}
                            />
                        </View>    
                        :
                        <View style={styles.defaultProfilePicContainer} >
                            <Text style={styles.defaultProfilePicText}>{userInformation.name.charAt(0).toUpperCase()+userInformation.surname.charAt(0).toUpperCase()}</Text>
                        </View>
                    }
                </View>
                <View style={{alignItems:'center', marginVertical:15,}}>
                    <Text style={{fontWeight:'600', fontSize:19, color:'#4d4d4d'}}>{userInformation.name+" "+userInformation.surname}</Text>
                </View>

                <View style={{alignItems:'center',}}>
                    <Text style={{fontWeight:'600', fontSize:19, color:'#4d4d4d'}}>{userInformation.mail}</Text>
                </View>

            </View>

            <View style={{flex:1, justifyContent:'flex-end',}}>
                <Pressable onPress={() => navigation.navigate('Settings', userInformation)} style={{backgroundColor:'red', marginHorizontal:20, marginBottom:20, alignItems:'center', borderRadius:20, paddingVertical:5,}}>
                    <Text style={{fontSize:23, color:'white', fontWeight:'bold'}}>Profili Düzenle</Text>
                </Pressable> 
            </View>
        </View>
    );
}
 
export default Profile;