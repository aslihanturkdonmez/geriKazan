import React, { useEffect, useState, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { Icon, Image, Text, TextInput } from '../../components';
import {authentication, database} from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser as setUserToRedux } from '../../store/actions/UserAction';
import * as ImagePicker from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';


const Account = () => {
    const {user: userInfo}=useSelector(state => state.user);
    const [user, setUser] = useState(userInfo);
    const [updateSuccess, setUpdateSuccess] = useState(undefined);
    const [mail, setMail] = useState(userInfo.mail)

    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            setMail(userInfo.mail);
        }, [userInfo])
      );


/*     useEffect(() => {
      setUser(userInfo);
    }, []); */

    const handleSignOut = () => {
        authentication.signOut();
        dispatch(removeUser());
    }

    const pickImage = () => {
        const options = {
            maxHeight: 500,
            maxWidth: 500,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        };

        ImagePicker.launchImageLibrary(options, response => {   
            const source = response.assets[0].uri;
            setUser({...user, profilePicture:source})            
          });
    }

    const saveUserInfo = () => {
        database.user.editUser(user.uid, user)
        .then(()=>{
            dispatch(setUserToRedux(user))
            setUpdateSuccess(true);
        })
        .catch(()=>{
            setUpdateSuccess(false);
        });
    }

    return ( 
        <View>
            <View>
                <View style={{alignItems:'center', marginVertical:50,}}>
                    {
                        user?.profilePicture ?
                        <Image 
                        style={{width:120, height:120, borderRadius:60,}}
                        source={{uri: user.profilePicture}}
                        />
                        :
                        <View style={{width:120, height:120, backgroundColor:'blue', borderRadius:60, alignItems:'center', justifyContent:'center'}} >
                                <Text style={{color:'white', fontWeight:'bold', fontSize:35}}>AS</Text>
                            </View>
                    }
                        <View style={{backgroundColor:'#cdcdcd', position: 'absolute', zIndex: 1, left:220, top:90, borderRadius:20, padding:4 }}>
                            <Pressable onPress={pickImage}>
                                <Icon 
                                    iconSet='MaterialCommunity'
                                    icon={"pencil-outline"}
                                    size={22}
                                    color={"white"}
                                    style={{}}
                                />
                            </Pressable>
                        </View>
                </View>
                <TextInput 
                    placeholder={user?.mail}
                    value={mail}
                    onChangeText={setMail}
                />
{/*                 <TextInput 
                    placeholder={user?.mail}
                    //value={user.mail}
                /> */}
            </View>
            <Pressable onPress={handleSignOut}>

                <Text >Çıkış Yap</Text>
            </Pressable>

            <Pressable onPress={saveUserInfo}>
                <Text>Bilgileri Kaydet</Text>
            </Pressable>
                
        </View>
     );
}
 
export default Account;