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
    let user = await firestore().collection('Users').doc(uid).get();
    let pair={uid: uid}
    user._data={...user._data, ...pair}
    //console.log(user._data);
    //user["_data"]["uid"]=uid;
    return user;
}

const editUser = async(uid, user) => {
    console.log(uid)
    firestore()
    .collection('Users')
    .doc(uid)
    .update(user)
    .then(() => {
        console.log("user updated");
    })
}

export default {createUser, getUser, editUser};