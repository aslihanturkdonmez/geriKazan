import React, {useState} from 'react';
import { View } from 'react-native';
import {Text, TextInput, KeyboardAvoidingView, Image} from '../../../components';
import styles from './Login.style';

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Text style={styles.brandText}>Geri Kazan</Text>
                <Text style={styles.loginText}>Giriş Yap</Text>
                <View>
                    <Image source={require('../../../resources/logo.png')} style={styles.logo}/>
                </View>
                <TextInput 
                    onChangeText={setMail}
                    value={mail}
                    placeholder="Mail Adresinizi Giriniz"
                    style={styles.textInput}
                />
                <TextInput 
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Şifrenizi Giriniz"
                    secureTextEntry={true}
                    style={styles.textInput}
                />
            </View>
        </KeyboardAvoidingView>
      );
}
 
export default Login;