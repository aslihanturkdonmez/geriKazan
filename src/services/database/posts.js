import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import authentication from '../authentication/authentication';

const getAllPosts = async () => {
    const allPosts = firestore().collection('Posts')

    const posts=await allPosts.get().then((querySnapshot)=> {
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          });

          return tempDoc;
    })

    return posts;
}

const createPost = async ({title, description, price , city, state, localUri}) => {
    
    let remoteUri=[];

    //console.log(localUri);
    
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
    const post = await firestore().collection('Posts').doc(id).get();
    return post;
}

export default {getAllPosts, createPost, getPost, uploadPhoto};