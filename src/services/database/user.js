import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import authentication from '../authentication/authentication';

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
    firestore()
    .collection('Users')
    .doc(uid)
    .update(user)
    .then(() => {
        console.log("user updated");
    });
}


const uploadPhoto = async (uid, uri) => {
    const path=`profilePhotos/${uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
        const response= await fetch(uri);
        const file=await response.blob();

        let upload = storage().ref(path).put(file);

        upload.on(
            "state_changed",
            snapshot => {},
            err => {
                rej(err);
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
        );

    });
}

const deleteAccount = (user_id) => {
    firestore()
    .collection('Users')
    .doc(user_id)
    .delete()
    .then(() => {
        console.log('User deleted!');
    });
}


export default {createUser, getUser, editUser, uploadPhoto, deleteAccount};