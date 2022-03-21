import React from 'react';
import { Image } from 'react-native';

const MyImage = ({style, source, resizeMode }) => {
    return (
        <Image
            style={style}
            source={source}
            resizeMode={resizeMode}
        />
    );
}

export default MyImage;