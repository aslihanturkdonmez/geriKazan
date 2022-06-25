import React, { useState } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';


const MyImage = ({style, source, resizeMode, cache }) => {
    const [loading, setLoading] = useState(true);

    return (
        cache ?
            <FastImage 
                style={style}
                source={{
                    cache:FastImage.cacheControl.immutable,
                    uri:source
                }}
                resizeMode={FastImage.resizeMode[resizeMode]}
                onLoadEnd={() => {setLoading(false)}}
            />
        :
            <Image
                source={source}
                resizeMode={resizeMode}
                onLoadEnd={() => {setLoading(false)}}
                style={style}
            />
    );
}

export default MyImage;