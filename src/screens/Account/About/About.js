import React from 'react';
import { Pressable, View, Linking, } from 'react-native';
import { Header, Icon, Text, Image } from '../../../components';

const About = ({navigation}) => {

    const goToSocialMedia = async(url) => {
        await Linking.openURL(url);
    }
    return (  
        <View style={{backgroundColor:'#fff', flex:1}}>
            <Header styleContainer={{justifyContent: 'space-between', }}>
                <Pressable onPress={() => navigation.goBack()} style={{marginHorizontal:15,}}>
                    <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                    />
                </Pressable>
                <Text style={{margin:8, fontSize:20, alignSelf: 'center', fontWeight:'bold'}}>Hakkında</Text>
                <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                        color={'#fff'}
                        style={{marginHorizontal:15,}}
                />
            </Header>
            <View style={{alignItems:'center',}}>
                <Image 
                    style={{width:200, height:200}}
                    source={require('../../../resources/assets/geriKazanLogo.png')}
                    resizeMode='contain'
                />
                <Text style={{marginTop:-20,}}>Sürüm 1.0.0</Text>
            </View>
            <View style={{marginHorizontal:20, marginVertical:30, alignItems:'center', marginTop:50,}}>
                <Text style={{fontWeight:'bold', fontSize:20, marginBottom:8, color:'#444'}}>HAKKINDA</Text>
                <Text style={{ textAlign:'center', fontSize:18, color:'#000', }}>
                    Geri dönüşüme önem veren; geri dönüşüme katkı sağlamak isteyen ve/veya geri dönüşüm ile bütçesine sembolik rakamlar katmak isteyen herkes, geri dönüşüme en büyük katkıyı sağlayan geri dönüşüm işçileri ile bu platformda buluşuyor.
                </Text>
            </View>
            <View style={{ flexDirection:'row', justifyContent:'space-evenly', marginHorizontal:60, marginTop:40,}}>
                <Icon 
                    icon={'logo-instagram'}
                    size={40}
                    color={'#C13584'}
                    onPress={() => goToSocialMedia('https://www.instagram.com/asliturkdonmez/')}
                />
                <Icon 
                    icon={'logo-facebook'}
                    size={40}
                    color={'#3b5998'}
                    onPress={() => goToSocialMedia('https://www.linkedin.com/in/aslihan-turkdonmez')}
                />
                <Icon 
                    icon={'logo-twitter'}
                    size={40}
                    color={'#1DA1F2'}
                />
                <Icon 
                    icon={'logo-linkedin'}
                    size={40}
                    color={'#0072b1'}
                    onPress={() => goToSocialMedia('https://www.linkedin.com/in/aslihan-turkdonmez')}
                />
            </View>
        </View>
    );
}
 
export default About;