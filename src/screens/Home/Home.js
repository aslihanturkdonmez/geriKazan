import React, { useEffect, useState } from 'react';
import { View, FlatList  } from 'react-native';
import {Text, PostCard} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {database, authentication} from '../../services';
import {setUser} from '../../store/actions/UserAction';
import { addFav, removeFav } from '../../store/actions/FavoritesActions';


const Home = ({navigation}) => {
    const dispatch = useDispatch();
    
    const [posts, setPosts] = useState([]);
    const user=useSelector((state) => state.user);

    const userFavList = useSelector((state) => state.favorites);
    const [userFavs, setUserFavs] = useState(userFavList);

    useEffect(() => {
        getPosts();
        setUserFavs(userFavList);
    
        return ()=> {
            setUserFavs([]);
        };
      
    }, [userFavList]);

    const onPressProduct = (data) => {
        navigation.navigate('ProductDetail', data);
    }

    const favFlagFinder = (dataId) => {
        const favFlagValue=userFavs.find((fav) => {
            return fav.id === dataId
        });
        
        return !!favFlagValue;
    }

    const setFavCount = (dataId, value) => {
        const tempPost= posts.filter((p) => {
            if(p.id === dataId) {
                p.favCount = p.favCount + value;
            };
            return p;
        });
        setPosts(tempPost);
    }

    const setFavorite = (favFlag, dataId, title, price, image) => {
        if(favFlag) {
            dispatch(removeFav(dataId));
            setFavCount(dataId, -1);
            
            database.user_favs.removeUserFav(user.uid, dataId);
            database.posts.setFavCount(dataId, -1);
        }else{

            dispatch(addFav({id: dataId, title, price, images: image}));
            setFavCount(dataId, 1);

            database.user_favs.setUserFavs(user.uid, dataId, title, price, image);
            database.posts.setFavCount(dataId, 1);
        }
    }

    const getPosts = async() => {
        const rawPosts=await database.posts.getAllPosts();
        setPosts(rawPosts);

        /* const mutData = Array.from(rawPosts);

        await Promise.all(mutData.map(async(p)=>{

            const {_data: postUserInfo}= await database.user.getUser(p.uid);

            p["user"]=
            {
                name:postUserInfo?.name || undefined,
                surname:postUserInfo?.surname || undefined,
                profilePicture:postUserInfo?.profilePicture || undefined,
                mail:postUserInfo?.mail || undefined
            }
        }));

        setPosts(mutData); */
    }

/*     const setCurrentUser = async() => {
        const {_data: user}= await database.user.getUser(uid);
        dispatch(setUser(user));
    } */

    const renderPostCard = (({item}) => <PostCard data={item} onPressProduct={onPressProduct} favFlag={favFlagFinder} setFavorite={setFavorite} />)
    


    return (
        <View style={{flex:1,}}>
            <FlatList 
                data={posts}
                renderItem={renderPostCard}
                numColumns={2}
            />
        </View>
      );
}
 
export default Home;