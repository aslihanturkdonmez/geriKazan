import React from 'react';
import { Text } from 'react-native';
import styles from './Text.style';



const MyText = ({children, style}) => {

    return (
        <Text style={[style, styles]}>{children}</Text>
    );
}


export default MyText;