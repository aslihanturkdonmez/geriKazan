import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Modal, Dimensions, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, LoadingAnimation, PostCard, Text } from '../../components';
import { database } from '../../services';
import { addFav, removeFav, setFavs } from '../../store/actions/FavoritesActions';

const Favorites = ({navigation}) => {
    const dispatch = useDispatch();

    const {favorites, user}=useSelector(state => state);
    const [userFavorites, setUserFavorites] = useState(favorites);
    const [loading, setLoading] = useState(false);

    const {width, height}=Dimensions.get('screen');

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

    const setFavorite = async (favFlag, dataId, title, price, image, advertiser_id) =>{
        if(favFlag) {
            setUserFavorites(removeFavFromState(dataId));
            dispatch(removeFav(dataId));
            
            database.user_favs.removeUserFav(user.uid, dataId);
            database.posts.setFavCount(dataId, -1);
        }else{

            dispatch(addFav({id: dataId, title, price, images: image}));


            database.user_favs.setUserFavs(user.uid, dataId, title, price, image, advertiser_id);
            database.posts.setFavCount(dataId, 1);
        }
    }

    const onPressProduct = (data) => {
        const favFlag=favFlagFinder(data.id);
        navigation.navigate('ProductDetail', {product:data, user, favFlag, setFavorite, from:'Favorites'});
    }
    const loadingModal = () => {
        return (
            <Modal
				animationType="fade"
				transparent={true}
				visible={loading}
			>
				<View style={{alignItems:'center', justifyContent:'center',flex:1, backgroundColor:'rgba(255, 255, 255, 0.6)'}}>
					<LoadingAnimation
						source={require('../../resources/assets/loading.json')}
						style={{alignSelf:'center', width:width/2, height:height/2}}
					/>
				</View>
			</Modal>
        )
    }

    const renderItem = ({item}) => <PostCard data={item} favFlag={favFlagFinder} onPressProduct={onPressProduct} setFavorite={setFavorite}/>
    
/*     if(loading){
        return <LoadingAnimation source={require('../../resources/assets/loading.json')} />
    } */

    const renderListEmptyComponent = () => {
        return (
            <View style={{
                flex:1,
                alignItems:'center', 
                marginTop:240,
                justifyContent:'center',
                }}>
                <Text style={{ fontSize:20, 
        color:'#69b06f',
        fontWeight:'700',
        flex:1,
            }} >Henüz hiç favori ürün eklemedin!</Text>
                <Pressable onPress={() => navigation.navigate('Home')} style={{backgroundColor:'#59835e', alignItems:'center', marginHorizontal:30, marginTop:20, borderRadius:8, paddingVertical:5, }}>
                            <Text style={{fontSize:23, fontWeight:'500', color:'white', paddingHorizontal: 15,}}>Ürün Ekle</Text>
                        </Pressable>
            </View>
        )
    }

    return (  
        <View style={{backgroundColor:'#fff', flex:1,}}>
            <Header styleContainer={{alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{margin:8, fontSize:20, alignSelf: 'center', fontWeight:'bold'}}>Favorilerim</Text>
            </Header>
            {
                loading &&
                loadingModal()
            }
            <FlatList
                data={userFavorites}
                renderItem={renderItem}
                numColumns={2}
                ListEmptyComponent={renderListEmptyComponent}
            />
        </View>
    );
}
 
export default Favorites;