import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Header, Icon, Text, TextInput } from '../../../components';
import { database } from '../../../services';

const Feedback = ({navigation, route}) => {
    const user = route.params;
    const [feedback, setFeedback] = useState("");
    return (  
        <View style={{backgroundColor:'#fff', flex:1,}}>
            <Header styleContainer={{justifyContent: 'space-between', }}>
                <Pressable onPress={() => navigation.goBack()} style={{marginHorizontal:15,}}>
                    <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                    />
                </Pressable>
                <Text style={{margin:8, fontSize:20, alignSelf: 'center', fontWeight:'bold'}}>Geri Bildirim</Text>
                <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                        color={'#fff'}
                        style={{marginHorizontal:15,}}
                />
            </Header>

            <View style={{marginVertical:10, marginHorizontal:20, height:350, borderRadius:12, borderWidth:0.4, backgroundColor:'#f2f2f2', paddingHorizontal:10, paddingTop:5,}}>
                <TextInput 
                    style={{backgroundColor:'transparent', alignItems: 'flex-start', color:'#000', fontSize:17,}}
                    multiline={true}
                    placeholderTextColor={'#333'}
                    placeholder='Daha iyi bir deneyim sunabilmemiz için lütfen düşüncelerinizi bizimle paylaşın. Teşekkür ederiz.'
                    onChangeText={setFeedback}
                    value={feedback}
                />
            </View>
            <View style={{flex:1, justifyContent:'flex-end', marginBottom:30,}}>
                <Pressable onPress={() => {
                    database.posts.giveFeedback(user.uid, feedback)
                    setFeedback("");
                    navigation.navigate('Account')
                    }} style={{backgroundColor:'#59835e', alignItems:'center', marginHorizontal:30, marginTop:20, borderRadius:8, paddingVertical:5, }}>
                    <Text style={{fontSize:23, fontWeight:'500', color:'white', paddingHorizontal: 15,}}>Gönder</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Feedback;