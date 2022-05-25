import React from 'react';
import { View } from 'react-native';
import { Text } from '../../components';

const ProductDetail = ({route}) => {
    console.log(route.params);
    return (
        <View>
            <Text>ProductDetail</Text>
        </View>
    );
}
 
export default ProductDetail;