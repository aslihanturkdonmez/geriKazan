import React, { useEffect, useState } from 'react';
import { View, FlatList  } from 'react-native';
import {Text, PostCard} from '../../components';
import { useDispatch } from 'react-redux';
import {database, authentication} from '../../services';
import {setUser} from '../../store/actions/UserAction';


const Home = () => {
    const [posts, setPosts] = useState([])

    const dispatch = useDispatch();
    const {uid}=authentication.getCurrentUser();


    useEffect(() => {

        setCurrentUser();
        getPosts();
    
      return () => {
        
      }
    }, []);


    const getPosts = async() => {
        const rawPosts=await database.posts.getAllPosts();

        const mutData = Array.from(rawPosts);

        await Promise.all(mutData.map(async(p)=>{
            //console.log(p)
            const {_data: postUserInfo}= await database.user.getUser(p.uid);
            //console.log(postUserInfo?.name || "")
            //const {name, surname, profilePicture, mail}=postUserInfo;
            p["user"]=
            {
                name:postUserInfo?.name || undefined,
                surname:postUserInfo?.surname || undefined,
                profilePicture:postUserInfo?.profilePicture || undefined,
                mail:postUserInfo?.mail || undefined
            }
        }));

        //console.log(mutData);
        setPosts(mutData);

    }

    const setCurrentUser = async() => {
        
        const {_data: user}= await database.user.getUser(uid);
        dispatch(setUser(user));
    }

    const renderPostCard = (({item}) => <PostCard data={item} />)
    


    return (
        <View>
            <Text>Selam</Text>
            <FlatList 
                data={posts}
                renderItem={renderPostCard}
            
            />

        </View>
      );
}
 
export default Home;