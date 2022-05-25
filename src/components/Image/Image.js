import React from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image'

const MyImage = ({style, source, resizeMode, cache }) => {
    return (
        cache ?
        <FastImage 
            style={style}
            source={{
                cache:FastImage.cacheControl.immutable,
                uri:source
            }}
            resizeMode={FastImage.resizeMode[resizeMode]}
        />
        :
        <Image
            style={style}
            source={source}
            resizeMode={resizeMode}
        />
    );
}

export default MyImage;