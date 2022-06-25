import auth from '@react-native-firebase/auth';

const createUser = async (mail, password) => {
    const signUpResponse=await auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(() => {
            console.log('User account created & signed in!');
            return 1;
        })
        .catch(error => {
            console.log(error.code);
            return error;
        });
    return signUpResponse;
}

const signIn = async (mail, password) => {
    const signInResponse=await auth()
        .signInWithEmailAndPassword(mail, password)
        .then(() => {
            console.log('signed in!');
            return 1;
        })
        .catch(error => {
            console.error(error);
            return -1;
        });
    return signInResponse;
}

const signOut =async () => {
    await auth()
    .signOut()
    .then(() => {
            console.log('User signed out!')
        }
    );
}

const getCurrentUser = () => {
    return auth().currentUser;
}

const deleteAccount = () => {
    auth().currentUser.delete();
}


export default {createUser, signIn, signOut, getCurrentUser, deleteAccount};