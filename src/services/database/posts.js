import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import authentication from '../authentication/authentication';

const getAllPosts = () => {
    const allPosts = firestore().collection('Posts')

    const posts=allPosts.orderBy('timestamp', 'desc').get().then((querySnapshot)=> {
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          });

          return tempDoc;
    })

    return posts;
}

const createPost = async ({title, description, price , city, state, localUri}) => {
    
    let remoteUri=[];

    if(localUri){

        const imgArray=await Promise.all(localUri.map(async(uri, index)=>{
            const rUri=await uploadPhoto(uri["img"+index]);
            return rUri;
        }));
        remoteUri=imgArray;
    }

    return new Promise ((res, rej) => {
            firestore()
            .collection('Posts')
            .add({
                title,
                description,
                price,
                city,
                state,
                uid:authentication.getCurrentUser().uid,
                timestamp: Date.now(),
                images: remoteUri || null,
                favCount:0,
                //commentCount:0,
            })
            .then((ref) => {
                console.log("post added");
                res(ref);
            })
            .catch(err => {
                console.log("err " + err);
                rej(err);
            })
    })
}

const uploadPhoto = async (uri) => {
    const path=`photos/${authentication.getCurrentUser().uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
        const response= await fetch(uri);
        const file=await response.blob();
        
        let upload = storage().ref(path).put(file);

        //console.log(upload);

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

const getPost = async (id) => {
    let post = await firestore().collection('Posts').doc(id).get();
    post._data={...post._data, ...{id}}
    return post;
}

const setFavCount = (id, value) => {
    firestore()
    .collection('Posts')
    .doc(id)
    .update({
        favCount: firebase.firestore.FieldValue.increment(value)
    })
    .then(() => {
        console.log("fav count updated");
    });
}

const getUserPosts = (uid) => {
    const posts=firestore()
    .collection('Posts')
    .where('uid' , '==' , uid.toString())
    .get()
    .then((querySnapshot)=> {
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          });

          return tempDoc;
    })
    return posts;
}

const getFilteredPosts = (leastPrice, mostPrice, city, state) => {

    let query=firestore().collection('Posts');

    if(leastPrice) query=query.where('price' ,'>=', leastPrice);
    if(mostPrice) query=query.where('price', '<=', mostPrice);
    if(city) query=query.where('city', '==', city);
    if(state) query=query.where('state', '==', state);

    if(!leastPrice && !mostPrice) query = query.orderBy('timestamp', 'desc');

    const posts=query.get().then((querySnapshot)=> {
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        });
        return tempDoc;
    })
    return posts;
}

const deletePost = (product_id) => {
    const del=firestore()
    .collection('Posts')
    .doc(product_id)
    .delete()
    .then(() => {
        console.log("post deleted");
    })
    return del;
}

const reportPost = (product_id, user_id) => {
    const del=firestore()
    .collection('Report')
    .doc(product_id)
    .update({
        [user_id]: true,
    })
    .then(() => {
        console.log("post report");
    })
    return del;
}

const giveFeedback = (user_id, feedback) => {
    const del=firestore()
    .collection('Feedback')
    .add({
        user_uid: user_id,
        feedback,
    })
    .then(() => {
        console.log("post report");
    })
    return del;
}

export default {getAllPosts, createPost, getPost, uploadPhoto, setFavCount, getUserPosts, getFilteredPosts, deletePost, reportPost, giveFeedback};