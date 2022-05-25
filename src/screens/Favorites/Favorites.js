import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PostCard, Text } from '../../components';
import { database } from '../../services';
import { addFav, removeFav, setFavs } from '../../store/actions/FavoritesActions';

const Favorites = ({navigation}) => {
    const dispatch = useDispatch();

    const {favorites, user}=useSelector(state => state);
    const [userFavorites, setUserFavorites] = useState(favorites);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

      //getUserFavorites();
      //setUserFavorites(favorites);
    
      return () => {
      }
    }, []);

    useFocusEffect(
        useCallback(() => {
            getUserFavorites();
        }, [])
    );


    const getUserFavorites =async () => {
        setLoading(true);
        const favs=await database.user_favs.getUserFavs(user.uid);
        setUserFavorites(favs);
        dispatch(setFavs(favs));
        setLoading(false);
    }

    const favFlagFinder = () => {
        return true;
    }

    const removeFavFromState = (id) => {
        const tempFavs = userFavorites.filter((f) => {
            return f.id !== id
        });

        return tempFavs;
    }

    const setFavorite = async (favFlag, dataId, title, price, image) =>{
        if(favFlag) {

            setUserFavorites(removeFavFromState(dataId));
            dispatch(removeFav(dataId));
            
            database.user_favs.removeUserFav(user.uid, dataId);
            database.posts.setFavCount(dataId, -1);
        }else{

            dispatch(addFav({id: dataId, title, price, images: image}));

            database.user_favs.setUserFavs(user.uid, dataId, title, price, image);
            database.posts.setFavCount(dataId, 1);
        }
    }

    const onPressProduct = (data) => {
        navigation.navigate('ProductDetail', data);
    }

    const renderItem = ({item}) => <PostCard data={item} favFlag={favFlagFinder} onPressProduct={onPressProduct} setFavorite={setFavorite}/>
    
    
    if(loading){
        return <ActivityIndicator size={'large'} />
    }

    return (  
        <View>
            <Text>Favoriler</Text>
            <FlatList 
                data={userFavorites}
                renderItem={renderItem}
                numColumns={2}
            />
        </View>
    );
}
 
export default Favorites;