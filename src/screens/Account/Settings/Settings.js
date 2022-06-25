import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text, Icon, TextInput, Image, Header } from '../../../components';
import styles from './Settings.style';
import ImagePicker from 'react-native-image-crop-picker';
import { database } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { setUser as setUserAction } from '../../../store/actions/UserAction';

const InputFieldComponent = ({ fieldTitle, value, onChangeText, styleContainer, styleTitle, styleInputContainer, styleInput }) => {
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

const Settings = ({ route, navigation }) => {

    //const userInformation=route.params;
    const dispatch = useDispatch();
    const userInformation = useSelector(state => state.user);
    const [user, setUser] = useState(userInformation);
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [mail, setMail] = useState(userInformation.mail);
    const [name, setName] = useState(userInformation.name);
    const [surname, setSurname] = useState(userInformation.surname);
    const [profilePicture, setProfilePicture] = useState(userInformation.profilePicture);

    const updateUser = async () => {

        let remoteUri = null;

        if (profilePicture !== userInformation.profilePicture) {
            const url = await database.user.uploadPhoto(userInformation.uid, profilePicture);
            remoteUri = url;
        }
        const newUser = {
            uid: userInformation.uid,
            mail,
            name,
            surname,
            profilePicture: remoteUri ? remoteUri : profilePicture,
        }

        setUser(newUser);
        database.user.editUser(newUser.uid, newUser).then(() => {
            dispatch(setUserAction(newUser));
            setUpdateSuccess(true);
            navigation.navigate('Account')
            console.log("successs");
        }).catch(() => {
            setUpdateSuccess(false);
        })
    }

    const pickImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(img => {
            console.log(img);
            setProfilePicture(img.path);
        });
    }

    return (
        <View style={styles.container}>
            <Header styleContainer={{ justifyContent: 'space-between', }}>
                <Pressable onPress={() => navigation.navigate('Account')} style={{ marginHorizontal: 15, }}>
                    <Icon
                        icon={'md-arrow-back-sharp'}
                        size={20}
                    />
                </Pressable>
                <Text style={{ margin: 8, fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>Profilim</Text>
                <Icon
                    icon={'md-arrow-back-sharp'}
                    size={20}
                    color={'#fff'}
                    style={{ marginHorizontal: 15, }}
                />
            </Header>
            <View style={{ paddingHorizontal: 20,  marginTop:20,}}>
                <View style={styles.profilePictureContainer}>
                    {profilePicture ?
                        <Image
                            style={styles.profilePic}
                            source={{ uri: profilePicture }}
                        />
                        :
                        <View style={styles.defaultProfilePicContainer} >
                            <Text style={styles.defaultProfilePicText}>{user.name.charAt(0).toUpperCase() + user.surname.charAt(0).toUpperCase()}</Text>
                        </View>
                    }
                    <View style={styles.editProfilePicIcon}>
                        <Pressable onPress={pickImage}>
                            <Icon
                                iconSet='MaterialCommunity'
                                icon={"pencil-outline"}
                                size={21}
                                color={"white"}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={{marginTop:20,}}>
                    <InputFieldComponent
                        fieldTitle={'E-mail'}
                        onChangeText={setMail}
                        value={mail}
                        styleTitle={{fontSize:18, color:'#404040', paddingHorizontal:3, fontWeight:'600' }}
                        styleContainer={{ marginVertical:5, }}
                        styleInputContainer={{ marginVertical:8, paddingHorizontal:4, backgroundColor: 'white', borderRadius:8, borderWidth:0.5, borderColor:'#cecece', elevation:3, }}
                    />
                    <InputFieldComponent
                        fieldTitle={'İsim'}
                        onChangeText={(text) => { setName(text) }}
                        value={name}
                        styleTitle={{fontSize:18, color:'#404040', paddingHorizontal:3, fontWeight:'600'}}
                        styleContainer={{ marginVertical:5,  }}
                        styleInputContainer={{ marginVertical:8, paddingHorizontal:4, backgroundColor: 'white', borderRadius:8, borderWidth:0.5, borderColor:'#cecece', elevation:3, }}
                        styleInput={{color:'#000', fontWeight:'400'}}
                    />
                    <InputFieldComponent
                        fieldTitle={'Soyisim'}
                        onChangeText={setSurname}
                        value={surname}
                        styleTitle={{fontSize:18, color:'#404040', paddingHorizontal:3,fontWeight:'600' }}
                        styleContainer={{ marginVertical:5, }}
                        styleInputContainer={{ marginVertical:8, paddingHorizontal:4, backgroundColor: 'white', borderRadius:8, borderWidth:0.5, borderColor:'#cecece', elevation:3, }}
                    />
                </View>
            </View>
            <View style={{flex:1, justifyContent:'flex-end', marginBottom:30,}}>
                <Pressable onPress={updateUser} style={{backgroundColor:'#59835e', alignItems:'center', marginHorizontal:30, marginTop:20, borderRadius:8, paddingVertical:5, }}>
                    <Text style={{fontSize:23, fontWeight:'500', color:'white', paddingHorizontal: 15,}}>Düzenlemeyi Kaydet</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Settings;