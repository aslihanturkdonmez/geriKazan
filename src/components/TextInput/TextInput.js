import React from 'react';
import { TextInput } from 'react-native';

const MyTextInput = ({onChangeText, text, style, placeholder, secureTextEntry}) => {
    return (  
        <TextInput 
            onChangeText={onChangeText}
            value={text}
            style={style}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    );
}
 
export default MyTextInput;