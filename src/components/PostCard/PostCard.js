import React from 'react';
import { View } from 'react-native';
import Text from '../Text';

const PostCard = ({data}) => {
    return (  
        <View style={{margin:10, backgroundColor:'yellow'}}>
            <Text>{data.text}</Text>
        </View>
    );
}
 
export default PostCard;
