import React from 'react';
import { Image } from 'react-native';

const MyImage = ({style, source}) => {
    return (
        <Image
            style={style}
            source={source}
        />
    );
}

export default MyImage;