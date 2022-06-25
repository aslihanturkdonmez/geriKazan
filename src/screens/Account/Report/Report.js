import React from 'react';
import { Pressable, View } from 'react-native';
import { Header, Icon, Image, Text } from '../../../components';

const Report = ({navigation}) => {
    return (  
        <View>
            <Header styleContainer={{justifyContent: 'space-between', }}>
                <Pressable onPress={() => navigation.goBack()} style={{marginHorizontal:15,}}>
                    <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                    />
                </Pressable>
                <Text style={{margin:8, fontSize:20, alignSelf: 'center', fontWeight:'bold'}}>Şikayet Et</Text>
                <Icon 
                    icon={'md-arrow-back-sharp'}
                    size={20}
                    color={'#fff'}
                    style={{marginHorizontal:15,}}
                />
            </Header>


        </View>
    );
}
 
export default Report;