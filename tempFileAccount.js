import React, { useEffect, useState, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { Icon, Image, Text, TextInput } from '../../../components';
import {authentication, database} from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser as setUserFromRedux } from '../../../store/actions/UserAction';
import * as ImagePicker from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';

const Account = () => {
    const userInfo=useSelector(state => state.user);
    const [user, setUser] = useState(userInfo);
    const [updateSuccess, setUpdateSuccess] = useState(undefined);
    const [mail, setMail] = useState(userInfo.mail);
    const [name, setName] = useState(userInfo.name);
    const [surname, setSurname] = useState(userInfo.surname);
    //const [password, setPassword] = useState(null);
    //const [passwordRe, setPasswordRe] = useState(null);
    //const [showPassword, setShowPassword] = useState(false);
    //const [showPasswordRe, setShowPasswordRe] = useState(false);


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

    const pickImage = async () => {
        const options = {
            maxHeight: 500,
            maxWidth: 500,
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        };

        ImagePicker.launchImageLibrary(options, async( response) => {   
            const source = response.assets[0].uri;

            const remoteUri=await database.user.uploadPhoto(user.uid, source);

            console.log(remoteUri)
            setUser({...user, profilePicture:remoteUri});
          });
    }

    const saveUserInfo = () => {
        database.user.editUser(user.uid, user)
        .then(()=>{
            dispatch(setUserFromRedux(user))
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


            {/* 
            
            <View style={styles.menu}>
                <Pressable style={styles.menuCard}>
                    <Icon 
                        icon={'person-outline'}
                        size={18}
                        color={'#000'}
                    />
                    <Text style={styles.menuText}>Profilim</Text>
                </Pressable>
                <Pressable style={styles.menuCard}>
                    <Icon 
                        icon={'cart-outline'}
                        size={18}
                        color={'#000'}
                    />
                    <Text style={styles.menuText}>Ürünlerim</Text >
                </Pressable>
                <Pressable style={styles.menuCard}>
                    <Icon
                        icon={'settings-outline'}
                        size={18}
                        color={'#000'}
                    />
                    <Text style={styles.menuText}>Ayarlar</Text >
                </Pressable>
                <Pressable style={[styles.menuCard, {borderBottomWidth:0.2,}]}>
                    <Icon   
                        icon={'ios-exit-outline'}
                        size={18}
                        color={'#000'}
                    />
                    <Text style={styles.menuText}>Çıkış Yap</Text >
                </Pressable>
            </View>
            
            
            */}


                
        </View>
     );
}
 
export default Account;