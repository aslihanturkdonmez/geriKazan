import React, { useState, useEffect } from 'react';
import { View, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { Header, Icon, Text, Image, MessageCard, TextInput } from '../../components';
import { database } from '../../services';
import styles from './MessageDetail.style';
import firestore from '@react-native-firebase/firestore';

const MessageDetail = ({route, navigation}) => {

    console.log(route.params);
    const {user, contactUser}=route.params;
    const groupID=user.uid > contactUser.uid ? user.uid+contactUser.uid : contactUser.uid+user.uid;

    const [messages, setMessages] = useState([]);
    const [loadingOldMessages, setLoadingOldMessages] = useState(true);
    const [message, setMessage] = useState(null);
    const [newMessage, setNewMessage] = useState({});

    const getOldMessages = async () => {
        const m=await database.chat.getChatMessages(user.uid, contactUser.uid);
        setMessages(m);
        setLoadingOldMessages(false);
    }

    useEffect(() => {
        const subscriber = firestore()
        .collection('Chats')
        .doc(groupID)
        .collection('Messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
                });
                console.log('====================================');
                console.log(tempDoc);
                console.log('====================================');
                setMessages(tempDoc);
            }); 
        return () => subscriber();
    }, [])
    

    useEffect(() => {
      getOldMessages();
    
      return () => {
        
      }
    }, []);

    const sendMessage = async() => {
        const date=Date.now();
        database.chat.setGroup(user, contactUser, message, date);
        database.chat.setChat(groupID, user, message, date)
        //database.chat.sendMessage(user.uid, messageRecipient.uid, message ,date);

        /* const messageDetails = {
            from_uid:user.uid,
            message:message,
            timestamp:date,
            id:messageID,
            to_uid: contactUser.uid,
            to_user:contactUser,
            from_user:user
        } */
        //setNewMessage(messageDetails);
        setMessage(undefined);
    }

    const renderItem = ({item}) => <MessageCard message={item} user={user} />
    

    return (  
        <View style={{flex:1, backgroundColor: '#efeae2',}}>
            <Header styleContainer={{marginBottom: 10, paddingVertical: 8, paddingHorizontal:10,}}>
                <Pressable onPress={() => navigation.goBack()} style={{marginRight:10,}}>
                    <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                    />
                </Pressable>

                <View style={{flexDirection:'row',}}>
                    {
                        contactUser.profilePicture ? 
                        <Image 
                            style={styles.profileImg}
                            source={{uri: contactUser.profilePicture}}
                        />
                        :
                        <View style={styles.defaultProfileImgContainer} >
                            <Text style={styles.defaultProfileImgText}>{contactUser.name.charAt(0).toUpperCase()+contactUser.surname.charAt(0).toUpperCase()}</Text>
                        </View>
                    }
                    <View style={{paddingHorizontal:7, justifyContent:'center',}}>
                        <Text style={{fontSize:17, fontWeight:'500'}}>{contactUser.name} {contactUser.surname}</Text>
                    </View>
                </View>
            </Header>
            {
                loadingOldMessages &&
                <ActivityIndicator />
            }
            <FlatList
                inverted
                data={messages}
                renderItem={renderItem}
                style={{flex:1,}}
            />
            <View style={{flexDirection:'row', backgroundColor:'#fff', padding:10, paddingVertical:15, }}>
                    <TextInput 
                        style={{flex:1, backgroundColor:'#f2f2f2', padding:6, borderRadius:10,}}
                        placeholder={'Mesaj Gönder'}
                        value={message}
                        onChangeText={setMessage}
                        placeholderTextColor={'#15242b'}
                        multiline={true}
                    />
                    <Pressable onPress={sendMessage} style={{paddingHorizontal:20, justifyContent:'center',}}>
                        <Text style={{color:'red', fontWeight:'bold', fontSize:18,}}>Gönder</Text>
                    </Pressable>
                </View>
        </View>
    );
}
 
export default MessageDetail;