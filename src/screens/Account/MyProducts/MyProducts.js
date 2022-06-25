import React, { useEffect, useState } from 'react';
import { View, FlatList, Pressable, Modal, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PostCard, Text, Header, Icon, LoadingAnimation } from '../../../components';
import { database } from '../../../services';
import { addFav, removeFav } from '../../../store/actions/FavoritesActions';

const MyProducts = ({route, navigation}) => {
    const dispatch = useDispatch();
    const user=route.params;
    const userFavList = useSelector((state) => state.favorites);
    const [userFavs, setUserFavs] = useState(userFavList);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setloadingPosts] = useState(false);
    const {width, height}=Dimensions.get('screen');

    useEffect(() => {
      getUserPosts();
      setUserFavs(userFavList);
    
      return ()=> {
        setUserFavs([]);
      };
  
    }, [userFavList]);

    const getUserPosts = async() => {
        setloadingPosts(true);
        const userPosts=await database.posts.getUserPosts(user.uid);
        console.log(userPosts);
        setPosts(userPosts);
        setloadingPosts(false);
    }

    const favFlagFinder = (dataId) => {
        const favFlagValue=userFavs.find((fav) => {
            return fav.id === dataId;
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

    const setFavorite = (favFlag, dataId, title, price, image, advertiser_id) => {
        if(favFlag) {
            dispatch(removeFav(dataId));
            setFavCount(dataId, -1);
            
            database.user_favs.removeUserFav(user.uid, dataId);
            database.posts.setFavCount(dataId, -1);
        }else{

            dispatch(addFav({id: dataId, title, price, images: image}));
            setFavCount(dataId, 1);

            database.user_favs.setUserFavs(user.uid, dataId, title, price, image, advertiser_id);
            database.posts.setFavCount(dataId, 1);
        }
    }
    const onPressProduct = (data) => {
        const favFlag=favFlagFinder(data.id);
        navigation.navigate('ProductDetail', {product:data, user, favFlag, setFavorite,});
    }
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
            }} >Henüz hiç ürün eklemedin!</Text>
                <Pressable onPress={() => navigation.navigate('AddProduct')} style={{backgroundColor:'#59835e', alignItems:'center', marginHorizontal:30, marginTop:20, borderRadius:8, paddingVertical:5, }}>
                            <Text style={{fontSize:23, fontWeight:'500', color:'white', paddingHorizontal: 15,}}>Ürün Ekle</Text>
                        </Pressable>
            </View>
        )
    }

    const loadingModal = () => {
        return (
            <Modal
				animationType="fade"
				transparent={true}
				visible={loadingPosts}
			>
				<View style={{alignItems:'center', justifyContent:'center',flex:1, backgroundColor:'rgba(255, 255, 255, 0.6)'}}>
					<LoadingAnimation
						source={require('../../../resources/assets/loading.json')}
						style={{alignSelf:'center', width:width/2, height:height/2}}
					/>
				</View>
			</Modal>
        )
    }

    const renderItem = ({item}) => <PostCard data={item} favFlag={favFlagFinder} setFavorite={setFavorite} onPressProduct={onPressProduct} />
    

    return (  
        <View style={{flex:1, backgroundColor:'#fff'}}>
            {
                loadingPosts &&
                loadingModal()
            }
            <Header styleContainer={{justifyContent: 'space-between', }}>
                <Pressable onPress={() => navigation.goBack()} style={{marginHorizontal:15,}}>
                    <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                    />
                </Pressable>
                <Text style={{margin:8, fontSize:20, alignSelf: 'center', fontWeight:'bold'}}>Ürünlerim</Text>
                <Icon 
                        icon={'md-arrow-back-sharp'}
                        size={20}
                        color={'#fff'}
                        style={{marginHorizontal:15,}}
                />
            </Header>
            <FlatList 
                data={posts}
                renderItem={renderItem}
                numColumns={2}
                ListEmptyComponent={renderListEmptyComponent}
            />
        </View>
    );
}
 
export default MyProducts;