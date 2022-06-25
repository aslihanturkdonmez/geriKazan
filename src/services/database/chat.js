import firestore from '@react-native-firebase/firestore';


const sendMessage = async(from_uid, to_uid, message, timestamp) => {
    const docId=await setGroup(from_uid, to_uid, message, timestamp);
    console.log(docId);
    setChat(docId, from_uid, message, timestamp);
    return docId;
}

const setChat = (docId, from_user, message, timestamp) => {
    const messageID=firestore()
    .collection('Chats')
    .doc(docId)
    .collection('Messages')
    .add({
        from_uid:from_user.uid,
        message,
        timestamp,
        from_user,
    }).then((docRef) => {
        console.log('chat added');
        return docRef.id;
    });
    return messageID;
}
const setGroup = (from_user, to_user, last_message, timestamp) => {

    const groupID=from_user.uid > to_user.uid ? from_user.uid+to_user.uid : to_user.uid+from_user.uid;

    firestore()
    .collection('Groups')
    .doc(groupID)
    .set({
        from_uid: from_user.uid,
        to_uid: to_user.uid,
        last_message,
        timestamp,
        to_user,
        from_user,
    })
    .then(() => {
        console.log("group added");
    });

    return groupID;
}

const getChatMessages = (from_uid, to_uid) => {
    const groupID=from_uid > to_uid ? from_uid+to_uid : to_uid+from_uid;

    const messages=firestore()
    .collection('Chats')
    .doc(groupID)
    .collection('Messages')
    .orderBy('timestamp', 'desc')
    .get()
    .then((querySnapshot) => {
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          });
          return tempDoc;

    });
    return messages;
}

//.where('uid' , '==' , uid.toString())

const getGroupsSentMessages =async (id) => {

    return new Promise((resolve, reject) => {
        firestore().collection('Groups').where('from_uid', '==', id)
        .onSnapshot((querySnapshot)=> {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            });
    
            resolve(tempDoc)
        });
    })
}

const getGroupsReceiveMessages = (id) =>{

    return new Promise((resolve, reject) => {
        firestore().collection('Groups').where('to_uid', '==', id).onSnapshot((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
              });
    
            resolve(tempDoc)
        });
    });
}



export default {sendMessage, setGroup, setChat, getChatMessages, getGroupsSentMessages, getGroupsReceiveMessages };