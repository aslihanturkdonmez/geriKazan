import React from 'react';
import { View, Pressable } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import styles from './FavBadge.style';

const FavBadge = ({style, favFlag, onPress}) => {
    //console.log(favFlag);
    return (  
        <Pressable style={{position: 'absolute', zIndex: 1, top:10, right:10,}} onPress={onPress}>
            <View style={{ backgroundColor:'transparent',  elevation:15,  borderRadius:30,}}>
                <Icon 
                    icon={favFlag ? "heart" : 'heart-outline'}
                    size={24}
                    color={favFlag ? 'tomato' : '#fff'}
                />
            </View>
        </Pressable>
    );
}
 
export default FavBadge;