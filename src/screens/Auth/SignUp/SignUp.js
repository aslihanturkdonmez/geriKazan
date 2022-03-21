import React, {useState} from 'react';
import { View, Pressable } from 'react-native';
import {Text, TextInput, KeyboardAvoidingView, Image} from '../../../components';
import styles from './SignUp.style';

const SignUp = ({navigation}) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRe, setPasswordRe] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRe, setShowPasswordRe] = useState(false);


    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const passwordVisibilityRe = () => {
        setShowPasswordRe(!showPasswordRe);
    }
    
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={0}>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../../resources/geriKazanLogo2.png')} style={styles.logo} resizeMode="contain"/>
                </View>
                <View style={styles.modalContainer}>
                    {/* <Text style={styles.loginText}>Giriş Yap</Text> */}
                    <View>
                        <TextInput 
                            onChangeText={setMail}
                            value={mail}
                            placeholder="Mail Adresinizi Giriniz"
                            style={styles.textInputMail}
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput 
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Şifrenizi Giriniz"
                                secureTextEntry={showPassword}
                                style={[styles.textInputPassword]}
                            />
                            <Pressable onPress={passwordVisibility}>
                                <Text style={{fontSize:10}}>{showPassword ? 'Göster' : 'Gizle'}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput 
                                onChangeText={setPasswordRe}
                                value={passwordRe}
                                placeholder="Şifrenizi Tekrar Giriniz"
                                secureTextEntry={showPasswordRe}
                                style={[styles.textInputPassword]}
                            />
                            <Pressable onPress={passwordVisibilityRe}>
                                <Text style={{fontSize:10}}>{showPasswordRe ? 'Göster' : 'Gizle'}</Text>
                            </Pressable>
                        </View>
                        <Pressable style={{backgroundColor:'#59835e', alignItems:'center', marginHorizontal:30, marginTop:10, borderRadius:8, paddingVertical:5, }}>
                            <Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>Giriş</Text>
                        </Pressable>
                    </View>
                    <View style={styles.loginContainer}>
                        <Text style={styles.isMember}>Üye misin?</Text>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.login}> Giriş Yap</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
      );
}
 
export default SignUp;