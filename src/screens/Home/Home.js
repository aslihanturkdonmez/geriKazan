import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Pressable, Modal, Dimensions, ActivityIndicator  } from 'react-native';
import {Text, PostCard, Header, TextInput, Icon, LoadingAnimation} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {database, authentication} from '../../services';
import {setUser} from '../../store/actions/UserAction';
import { addFav, removeFav } from '../../store/actions/FavoritesActions';
import {Picker} from '@react-native-picker/picker';
import {cityState} from '../../resources';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation}) => {
    const dispatch = useDispatch();
    
    const [posts, setPosts] = useState([]);
    const [postHolder, setPostHolder] = useState([]);
    const [filteredPostHolder, setFilteredPostHolder] = useState([]);

    const user=useSelector((state) => state.user);

    const userFavList = useSelector((state) => state.favorites);
    const [userFavs, setUserFavs] = useState(userFavList);
    const [modalVisibility, setModalVisibility] = useState(false);

    const [headerShown, setHeaderShown] = useState(true);
    const [scrollOffsetY, setScrollOffsetY] = useState(0);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [cityPickerFocus, setCityPickerFocus] = useState(false);
    const [statePickerFocus, setStatePickerFocus] = useState(false);

    const [mostPrice, setMostPrice] = useState(undefined);
    const [leastPrice, setLeastPrice] = useState(undefined);
    const [searchText, setSearchText] = useState("");
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingRefresh, setloadingRefresh] = useState(false);

    const {width, height}=Dimensions.get('screen');

    useEffect(() => {
        setUserFavs(userFavList);
        return ()=> {
            setUserFavs([]);
        };
      
    }, [userFavList]);
    
    useFocusEffect(
        useCallback(() => {
            getPosts();
        }, [])
      );

    const onPressProduct = (data) => {
        const favFlag=favFlagFinder(data.id);
        navigation.navigate('ProductDetail', {product:data, user, favFlag, setFavorite,});
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
        setPostHolder(tempPost);
        setFilteredPostHolder(tempPost);
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

    const getPosts = async() => {
        if(!loadingPosts) setloadingRefresh(true);
        const rawPosts=await database.posts.getAllPosts();
        setPosts(rawPosts);
        setloadingRefresh(false);
        setLoadingPosts(false);
        setPostHolder(rawPosts);
        setFilteredPostHolder(rawPosts);
    }

    const search = (text) => {
        setSearchText(text);

        if(!filteredPostHolder){
            return;
        }

        const filteredList=filteredPostHolder.filter(post =>{
            const searchedText=text.toLowerCase();
            if(searchedText.trim()=="" || !searchedText) {
                return posts;
            }
            
            const currentName=post.title.toLowerCase();
            return currentName.indexOf(searchedText) > -1;
        });
        setPosts(filteredList);
    }
    
    const cityPickerItemComponent = () => {
        return (
            Object.keys(cityState).map((city) => {
                return <Picker.Item label={city} value={city} key={city}/>
            })
        )
    } 

    const statePickerItemComponent = () => {
        return (
            cityState[selectedCity] ? 

            cityState[selectedCity].map((s) => {
                return <Picker.Item label={s} value={s} key={s}/>
            })
            :
            undefined
        )
    } 

    const applyFilters = async() => {
        setModalVisibility(false);
        const filtered_posts=await database.posts.getFilteredPosts(leastPrice, mostPrice, selectedCity, selectedState);
        setPosts(filtered_posts);
        setFilteredPostHolder(filtered_posts);
    }

    const resetFilters = () => {
        setSelectedCity(null);
        setSelectedState(null);
        setLeastPrice(null);
        setMostPrice(null);
        setPosts(postHolder);
        setFilteredPostHolder(postHolder);
        setModalVisibility(false);
    }

    const filterModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibility}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisibility(!modalVisibility);
                  }}
            >
                <View style={{backgroundColor:'rgba(0,0,0,0.6)', flex:1, justifyContent:'center'}}>
                    <View  style={{
                        margin: 20,
                        backgroundColor: "#fff",
                        borderRadius: 8,
                        padding: 20,
                        shadowColor: "#000",
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                    >
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20,}}>
                            <Icon 
                                icon={'close'}
                                size={27}
                                color='white'  
                                />
                            <Text style={{alignSelf: 'center', fontWeight:'bold', fontSize:24, color:'#000'}}>Filtrele</Text>
                            <Pressable onPress={()=> setModalVisibility(false)} style={{  }}>
                                <Icon 
                                    icon={'close'}
                                    size={27}
                                    
                                />
                            </Pressable>
                        </View>
                        <View>
                            <Text style={{fontSize:19, fontWeight:'bold', marginBottom:10,}}>Fiyat</Text>
                            <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between', marginBottom:10,}}>
                                <Text style={{fontSize:16, flex:0.5}}>En Az</Text>
                                <TextInput 
                                    placeholder={'TL'}
                                    style={{borderWidth:0.4, flex:1, padding:4, paddingHorizontal:10, borderRadius:8,}}
                                    value={leastPrice}
                                    onChangeText={setLeastPrice}
                                />
                            </View>
                            <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between', marginBottom:10,}}>
                                <Text style={{fontSize:16, flex:0.5}}>En Çok</Text>
                                <TextInput 
                                    placeholder={'TL'}
                                    style={{borderWidth:0.4, flex:1, padding:4, paddingHorizontal:10, borderRadius:8,}}
                                    value={mostPrice}
                                    onChangeText={setMostPrice}
                                />
                            </View>
                        </View>
                        <Text style={{fontSize:19, fontWeight:'bold', marginBottom:10, marginTop:20,}}>Konum</Text>
                        <View style={{borderWidth:0.5, padding:-10, borderRadius:8, marginBottom:10, }}>
                            <Picker 
                                mode='dialog'
                                selectedValue={selectedCity}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedCity(itemValue)
                                }
                                prompt="Şehir Seçiniz"
                                onFocus={() =>setCityPickerFocus(true)}
                                onBlur={() => setCityPickerFocus(false)}
                            >
                                {
                                    !cityPickerFocus && !selectedCity &&
                                    <Picker.Item label="Şehir seçiniz" value={null} enabled={false} />
                                }
                                {cityPickerItemComponent()}
                            </Picker>
                        </View>
                        <View style={{borderWidth:0.5, padding:-10, borderRadius:8, }}>
                            <Picker
                                mode='dialog'
                                selectedValue={selectedState}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedState(itemValue)
                                }
                                prompt="İlçe Seçiniz"
                                onFocus={() =>setStatePickerFocus(true)}
                                onBlur={() => setStatePickerFocus(false)}
                                enabled={!!selectedCity}
                            >
                                {
                                    !statePickerFocus && !selectedState &&
                                    <Picker.Item  label="İlçe seçiniz" value={null} enabled={false} />
                                }
                                {statePickerItemComponent()}
                            </Picker>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10, marginTop:20,}}>
                            <Pressable onPress={applyFilters} style={{backgroundColor:'#59835e', alignItems:'center', borderRadius:12, paddingVertical:7, paddingHorizontal:42, }}>
                                <Text style={{ fontSize:22, fontWeight:'500', color:'white'}}>Uygula</Text>
                            </Pressable>
                            <Pressable onPress={resetFilters} style={{backgroundColor:'#cf3030', alignItems:'center',  borderRadius:12, paddingVertical:7, paddingHorizontal:42, }}>
                                <Text style={{ fontSize:22, fontWeight:'500', color:'white'}}>Sıfırla</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const onRefresh = () => {
        getPosts();
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
						source={require('../../resources/assets/loading.json')}
						style={{alignSelf:'center', width:width/2, height:height/2}}
					/>
				</View>
			</Modal>
        )
    }

    const renderPostCard = (({item}) => <PostCard data={item} onPressProduct={onPressProduct} favFlag={favFlagFinder} setFavorite={setFavorite} />)

    return (
        <View style={{flex:1, backgroundColor:'#fff'}}>
            {
                loadingPosts &&
                loadingModal()
            }
           {
               headerShown &&
               <View style={[{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10,  marginHorizontal:10, marginBottom:3,} , scrollOffsetY<=0 ? undefined :  {position: 'absolute', zIndex: 1,}]}>
               <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:'#fff', borderRadius:10, paddingHorizontal:10, marginRight:5, elevation:8, }}>
                   <TextInput 
                       placeholder={"Ürün Ara"}
                       style={{padding: 8,flex:1}}
                       value={searchText}
                       onChangeText={search}
                   />

                    {
                        searchText!="" &&
                        <Pressable onPress={()=>search("")} style={{}}>
                            <Icon icon="close" size={25} color={"#000"} />
                        </Pressable>
                    
                    }
               </View>
               <Pressable onPress={()=>setModalVisibility(true)} style={{backgroundColor:'#fff', padding:10, borderRadius:10, elevation:8,}}>
                   <Icon 
                       icon={'filter'}
                       size={18}
                   />
               </Pressable>
           </View>
           }
            <FlatList 
                data={posts}
                renderItem={renderPostCard}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => {
                    
                    let y=event.nativeEvent.contentOffset.y;
                    setScrollOffsetY(y);
                    if(scrollOffsetY === y || y<=0) return setHeaderShown(true);
                    if(scrollOffsetY < y) {
                        setHeaderShown(false);
                    }else{
                        setHeaderShown(true);
                    }
                }}
                onRefresh={onRefresh}
                refreshing={loadingRefresh}
                
            />
            

            {
                filterModal()
            }
              
        </View>
      );
}
 
export default Home;