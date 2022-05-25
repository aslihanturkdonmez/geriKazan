import React from 'react';
import { View, Pressable } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import styles from './FavBadge.style';

const FavBadge = ({style, favCount, favFlag, onPress}) => {
    //console.log(favFlag);
    return (  
        <Pressable style={{position: 'absolute', zIndex: 1, top:10, right:10,  backgroundColor:'transparent'}} onPress={onPress}>
            <View>
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