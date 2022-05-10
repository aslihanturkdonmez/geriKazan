import firestore from '@react-native-firebase/firestore';

const createUser = (uid, userObj) => {
    firestore()
    .collection('Users')
    .doc(uid)
    .set(userObj)
    .then(() => {
        console.log('User added!');
    });
};

const getUser = async(uid) => {
    const user = await firestore().collection('Users').doc(uid).get();
    return user;
}

export default {createUser, getUser};