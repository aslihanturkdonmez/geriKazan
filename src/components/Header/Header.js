import React from 'react';
import { View } from 'react-native';
import styles from './Header.style';

const Header = ({children, styleContainer}) => {
    return (
        <View style={{...styles.container, ...styleContainer}}>
            {children}
        </View>
    );
}
 
export default Header;