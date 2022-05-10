import React, {useState} from 'react';
import { View, Pressable } from 'react-native';
import {Text, TextInput, KeyboardAvoidingView, Image} from '../../../components';
import { authentication } from '../../../services';
import styles from './Login.style';

const Login = ({navigation}) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleLoginPress =async () => {
        const loginResponse= await authentication.signIn(mail, password);
        if(loginResponse === 1){
            //redux state güncellenecek
        }
    }
    
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={-50}>
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
                                secureTextEntry={!showPassword}
                                style={[styles.textInputPassword, {flex:1}]}
                            />
                            <Pressable onPress={passwordVisibility}>
                                <Text style={{fontSize:10}}>{!showPassword ? 'Göster' : 'Gizle'}</Text>
                            </Pressable>
                        </View>
                        <Pressable onPress={handleLoginPress} style={{backgroundColor:'#59835e', alignItems:'center', marginHorizontal:30, marginTop:20, borderRadius:8, paddingVertical:5, }}>
                            <Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>Giriş</Text>
                        </Pressable>
                    </View>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.isMember} >Üye değil misin?</Text>
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signUp} > Üye Ol</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
      );
}
 
export default Login;