import React from 'react';
import { TextInput } from 'react-native';

const MyTextInput = ({onChangeText, value, style, placeholder, secureTextEntry, multiline, placeholderTextColor, keyboardType }) => {
    return (  
        <TextInput 
            onChangeText={onChangeText}
            value={value}
            style={style}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            placeholderTextColor={placeholderTextColor}
            keyboardType={keyboardType}
        />
    );
}
 
export default MyTextInput;