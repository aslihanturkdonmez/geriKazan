import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingAnimation = ({source, autoPlay=true, loop=true}) => {
    return (  
        <LottieView source={source} autoPlay={autoPlay} loop={loop} />
    );
}
 
export default LoadingAnimation;