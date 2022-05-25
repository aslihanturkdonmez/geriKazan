import firestore from '@react-native-firebase/firestore';

const setUserFavs = (uid, postId, title, price, image) => {
    firestore()
    .collection('User_Favs')
    .doc(uid)
    .collection('Favorites')
    .doc(postId)
    .set({
        id: postId,
        title,
        price,
        images:[image],
    })
    .then(() => {
        console.log('Fav added!');
    });
}

const removeUserFav = (uid, postId) => {
    firestore()
    .collection('User_Favs')
    .doc(uid)
    .collection('Favorites')
    .doc(postId)
    .delete()
    .then(() => {
        console.log("fav deleted");
    })
}


const getUserFavs =async (uid) => {
    const likes=await firestore()
    .collection('User_Favs')
    .doc(uid)
    .collection('Favorites')
    .get()
    .then((querySnapshot)=> {
        const tempDoc = querySnapshot.docs.map((doc) => {
            return doc.data() 
          });
        return tempDoc;
    }); 

    return likes;
}

export default {setUserFavs, getUserFavs, removeUserFav}


