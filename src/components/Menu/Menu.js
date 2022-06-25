import React from 'react';
import { View, Pressable } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import styles from './Menu.style';


const Menu = ({menu, iconSize, iconColor, styleContainer, styleCardWrapper, styleInnerContainer, styleIcon, styleText}) => {
    return (
        <View style={{...styles.container, ...styleContainer}}>
            {
            menu.map((m) => {
                return (
                    <Pressable onPress={m.onPress} style={{...styles.CardWrapper, ...styleCardWrapper}} key={m.id}>
                        <View style={{...styles.innerContainer, ...styleInnerContainer}}>
                            <Icon 
                                icon={m.icon}
                                size={iconSize}
                                color={iconColor}
                                style={{...styles.icon, ...styleIcon}}
                            />
                            <Text style={{...styles.text, ...styleText}}>{m.title}</Text>
                        </View>
                        <Icon 
                            icon={'chevron-forward-outline'}
                            size={20}
                        />
                    </Pressable>
    
                )
            })
            }
        </View>
    );
}
 
export default Menu;