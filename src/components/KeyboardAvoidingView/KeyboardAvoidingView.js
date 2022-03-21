import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import styles from './KeyboardAvoidingView.style';


const MyKeyboardAvoidingView = ({children, keyboardVerticalOffset}) => {
    return (  
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={keyboardVerticalOffset}
        
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
 
export default MyKeyboardAvoidingView;
