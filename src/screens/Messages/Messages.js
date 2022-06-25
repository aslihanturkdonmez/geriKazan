import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Image, MessageListCard, Text } from '../../components';
import { database } from '../../services';
import firestore from '@react-native-firebase/firestore';

const Messages = ({navigation}) => {
    const [sentMessages, setSentMessages] = useState([]);
    const userInfo=useSelector(state => state.user);
    const [user, setUser] = useState(userInfo);
    const [loading, setLoading] = useState(true);
    const [receiveMessages, setReceiveMessages] = useState([]);

    useEffect(() => {
        const subscriber = firestore().collection('Groups').where('from_uid', '==', user.uid)
        .onSnapshot((querySnapshot)=> {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setSentMessages(tempDoc);
        });

        return () => {
            subscriber();
        };

    }, []);


    useEffect(() => {
        const subscriber=firestore().collection('Groups').where('to_uid', '==', user.uid).onSnapshot((querySnapshot) => {
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
            });
            setReceiveMessages(tempDoc);
        }); 
    
      return () => {
        subscriber();
      }
    }, []);

    const navigateMessageDetail = (data) => {
        let contactUser;
        if(data.from_uid === user.uid){
            const {to_user}=data;
            const {profilePicture, name, surname, mail, uid}=to_user;
            contactUser={
                uid,
                profilePicture,
                name,
                surname,
                mail,
            }
        }else{
            const {from_user}=data;
            const {profilePicture, name, surname, mail, uid}=from_user;
            contactUser={
                uid,
                profilePicture,
                name,
                surname,
                mail,
            }
        }
        navigation.navigate('MessageDetail', {user, contactUser})
    }

    const renderListEmptyComponent = () => {
        return (
            <View style={{
                flex:1,
                alignItems:'center', 
                marginTop:240,
                justifyContent:'center',
                }}>
                <Text style={{ fontSize:20, 
        color:'#69b06f',
        fontWeight:'700',
        flex:1,
            }} >Henüz hiç mesajlaşmadın!</Text>
                <Pressable onPress={() => navigation.navigate('Home')} style={{backgroundColor:'#59835e', alignItems:'center', marginHorizontal:30, marginTop:20, borderRadius:8, paddingVertical:5, }}>
                            <Text style={{fontSize:20, fontWeight:'500', color:'white', paddingHorizontal: 15, paddingVertical:5,}}>Anasayfaya Dön</Text>
                        </Pressable>
            </View>
        )
    }


    const renderItem = ({item}) => <MessageListCard data={item} user={user} onPress={navigateMessageDetail} />


    return (  
        <View style={{backgroundColor:'#fff', flex:1,}}>
            <Header styleContainer={{alignItems: 'center', justifyContent: 'center',  backgroundColor:'#fff', }}>
                    <Text style={{margin:8, fontSize:20, alignSelf: 'center', fontWeight:'bold'}}>Mesajlar</Text>
            </Header>
            <FlatList 
                data={[...receiveMessages, ...sentMessages].sort((a,b) => b.timestamp - a.timestamp)}
                renderItem={renderItem}
                ListEmptyComponent={renderListEmptyComponent}
            />
        </View>
    );
}
 
export default Messages;
