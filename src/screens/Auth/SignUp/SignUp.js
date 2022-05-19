import React, {useState} from 'react';
import { View, Pressable , ScrollView} from 'react-native';
import {Text, TextInput, KeyboardAvoidingView, Image} from '../../../components';
import styles from './SignUp.style';
import { authentication, database } from '../../../services';
import { firebase } from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
    const [mail, setMail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [passwordRe, setPasswordRe] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRe, setShowPasswordRe] = useState(false);


    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const passwordVisibilityRe = () => {
        setShowPasswordRe(!showPasswordRe);
    }

    const handleRegister = async() => {
        const signUpResponse=await authentication.createUser(mail, password);
        //İşlem başarılı
        if(signUpResponse === 1){
            //Firestore işlemleri
            const userObject= {
                mail,
                name,
                surname,
                profilePicture: null,
            }

            //console.log(authentication.getCurrentUserId());
            database.user.createUser(authentication.getCurrentUser().uid, userObject)
            //authentication.signOut();
        }else{
            console.log("hata mesajı");
            console.log(signUpResponse)
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={require('../../../resources/assets/geriKazanLogo.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <KeyboardAvoidingView keyboardVerticalOffset={25}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View>
{/*                             <TextInput
                                onChangeText={setName}
                                value={name}
                                placeholder="Adınızı Giriniz"
                                style={styles.textInput}
                            />
                            <TextInput
                                onChangeText={setSurname}
                                value={surname}
                                placeholder="Soyadınızı Giriniz"
                                style={styles.textInput}
                            /> */}
                            <TextInput
                                onChangeText={setMail}
                                value={mail}
                                placeholder="Mail Adresinizi Giriniz"
                                style={styles.textInput}
                            />
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    onChangeText={setPassword}
                                    value={password}
                                    placeholder="Şifrenizi Giriniz"
                                    secureTextEntry={!showPassword}
                                    style={[styles.textInputPassword]}
                                />
                                <Pressable onPress={passwordVisibility}>
                                    <Text style={{ fontSize: 10 }}>{!showPassword ? 'Göster' : 'Gizle'}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    onChangeText={setPasswordRe}
                                    value={passwordRe}
                                    placeholder="Şifrenizi Tekrar Giriniz"
                                    secureTextEntry={!showPasswordRe}
                                    style={[styles.textInputPassword]}
                                />
                                <Pressable onPress={passwordVisibilityRe}>
                                    <Text style={{ fontSize: 10 }}>{!showPasswordRe ? 'Göster' : 'Gizle'}</Text>
                                </Pressable>
                            </View>
                        </View>
                        <Pressable onPress={handleRegister} style={{ backgroundColor: '#59835e', alignItems: 'center', marginHorizontal: 30, marginTop: 10, borderRadius: 8, paddingVertical: 5, }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Kayıt Ol</Text>
                        </Pressable>
                        <View style={styles.loginContainer}>
                            <Text style={styles.isMember}>Üye misin?</Text>
                            <Pressable onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.login}> Giriş Yap</Text>
                            </Pressable>
                        </View>
                        {/* <Text style={styles.loginText}>Giriş Yap</Text> */}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </View>
      );
}

export default SignUp;