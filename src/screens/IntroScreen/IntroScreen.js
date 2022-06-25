import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image } from '../../components';
import { storage } from '../../utils';
import { Dimensions } from 'react-native'

const IntroScreen = ({navigation}) => {
    console.log(Dimensions.get('screen').height);
    console.log(Dimensions.get('screen').width);


    const slides = [
        {
            key:1,
            image: require('../../resources/assets/1.png')
        },
        {
            key:2,
            image: require('../../resources/assets/2.png')
        },
        {
            key:3,
            image: require('../../resources/assets/3.gif')
        },
        {
            key:4,
            image: require('../../resources/assets/4.png')
        },
    ]

    const renderItem = ({item}) => {
        return (
            <Image 
                source={item.image}
                resizeMode={'cover'}
                style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}
            />
        )

    }

    const onDone = () => {
        storage.setIsUserFirstRun();
        navigation.navigate('Login')
    }

    return (  
        <AppIntroSlider 
            renderItem={renderItem} 
            data={slides}
            onDone={onDone}
        />
    );
}
 
export default IntroScreen;