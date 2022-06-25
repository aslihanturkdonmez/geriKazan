import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Header, Text, Icon, Image, FavBadge, TextInput, KeyboardAvoidingView } from '../../components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from 'moment';
import 'moment/locale/tr'
import styles from './ProductDetail.style';
import { database } from '../../services';

const ProductDetail = ({ route, navigation }) => {
    const { product: productDetails, favFlag, setFavorite, user, from } = route.params;

    const [product, setProduct] = useState(productDetails);
    const [favFlagV, setFavFlagV] = useState(favFlag);
    const [messageRecipient, setMessageRecipient] = useState(null);

    const [activeSlide, setActiveSlide] = useState(0);
    const [stickyHeader, setStickyHeader] = useState(false);


    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const { width, height } = Dimensions.get('screen');

    var date = new Date(product.timestamp);

    moment.locale('tr');
    const formattedDate = moment(date).fromNow();

    const getUserInfo = async () => {
        const { _data } = await database.user.getUser(product.uid);
        setMessageRecipient(_data);
        setLoading(false);
    }

    const getProductDetail = async () => {
        if (!product.timestamp) {
            const { _data } = await database.posts.getPost(product.id)
            setProduct(_data);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserInfo();
        getProductDetail();
    }, [])

    const deletePost = () => {

        Alert.alert(
            "Ürün Kalıcı Olarak Silinecek",
            "Ürünü silmek istediğinizden emin misiniz?",
            [
                {
                    text: "Sil",
                    onPress: () => database.posts.deletePost(product.id).then(() => navigation.navigate('Home'))
                },
                {
                    text: "İptal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
    }

    const postReport = () => {
        Alert.alert(
            "Ürün Şikayet Edilecek",
            "Ürünün burada olmaması gerektiğini düşünüyorsanız lütfen devam ediniz.",
            [
                {
                    text: "Şikayet Et",
                    onPress: () => database.posts.reportPost(product.id, user.uid).then(() => navigation.navigate('Home'))
                },
                {
                    text: "İptal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
    }


    const renderStickyHeader = () => {
        return (
            !stickyHeader ?
                <View style={styles.stickyHeaderContainer}>
                    <View style={styles.stickyHeaderIconContainer}>
                        <Pressable onPress={() => { navigation.goBack() }}>
                            <Icon
                                icon='close'
                                color='#cecece'
                                size={24}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.stickyHeaderIconContainer}>
                        {
                            product.uid === user.uid ?
                                <Pressable onPress={deletePost}>
                                    <Icon
                                        icon='trash-outline'
                                        color='#fff'
                                        size={24}
                                    />
                                </Pressable>
                                :
                                <Pressable onPress={postReport}>
                                    <Icon
                                        icon='warning-outline'
                                        color='#fff'
                                        size={24}
                                    />
                                </Pressable>
                        }
                    </View>

                </View>
                :
                <Header styleContainer={styles.headerComponentContainer}>
                    <Pressable onPress={() => { navigation.goBack() }}>
                        <Icon
                            icon='close'
                            color='#cecece'
                            size={24}
                        />
                    </Pressable>
                    <Text style={styles.headerComponentTitle}>{product.title}</Text>
                    <Icon
                        icon='close'
                        color='#fff'
                        size={24}
                    />
                </Header>
        )
    }

    const renderCarousel = ({ item }) => {
        return (
            <View>
                <Image
                    cache={true}
                    source={item}
                    style={styles.carouselImg}
                />
            </View>
        )
    }

    const setFavoriteCall = () => {
        console.log(product);
        const { id, title, price, images, uid } = product;

        if (favFlagV) {
            setFavorite(true, id, title, price, images[0], uid, true)
            setFavFlagV(false);
            if (from === 'Favorites') setProduct({ ...product, favCount: product.favCount - 1 })
        } else {
            setFavorite(false, id, title, price, images[0], uid, true)
            setFavFlagV(true);
            if (from === 'Favorites') setProduct({ ...product, favCount: product.favCount + 1 });
        }
    }

    const sendMessage = async () => {
        const date = Date.now();
        const groupID = await database.chat.setGroup(user, messageRecipient, message, date);
        const messageID = await database.chat.setChat(groupID, user, message, date)
        //database.chat.sendMessage(user.uid, messageRecipient.uid, message ,date);

        const { profilePicture, name, surname, mail, uid } = messageRecipient;
        const contactUser = {
            uid,
            profilePicture,
            name,
            surname,
            mail,
        }
        navigation.navigate('MessageDetail', { user, contactUser })
        setMessage(undefined);
    }

    const carouselPagination = () => {
        return (
            <Pagination
                dotsLength={product.images.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.paginationInactiveDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        )
    }

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollContainer}
                onScroll={(event) => {
                    const y = event.nativeEvent.contentOffset.y;
                    if (y > height / 2 - 50) {
                        setStickyHeader(true);
                    } else {
                        setStickyHeader(false);
                    }
                }}
                stickyHeaderIndices={[0]}
            >
                <View>
                    {renderStickyHeader()}
                </View>
                <View style={styles.carouselContainer}>
                    <Carousel
                        data={product.images}
                        renderItem={renderCarousel}
                        sliderWidth={width}
                        sliderHeight={height / 2}
                        itemWidth={height / 2}
                        onSnapToItem={(index) => setActiveSlide(index)}
                    />
                    {carouselPagination()}
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.price}>{product.price === '0' ? 'Ücretsiz' : "₺" + product.price}</Text>
                        <View style={styles.favBadgeContainer}>
                            <Pressable onPress={setFavoriteCall}>
                                <Icon
                                    icon={favFlagV ? "heart" : 'heart-outline'}
                                    size={30}
                                    color={favFlagV ? 'tomato' : '#000'}
                                />
                            </Pressable>
                        </View>
                    </View>

                    <Text style={styles.title}>{product.title}</Text>



                    <Text style={styles.description}>{product.description}</Text>



                    <View style={styles.dateFavCountContainer}>
                        <View style={styles.dateContainer}>
                            <Icon
                                icon={'fire'}
                                size={20}
                                color={'#fe3449'}
                                iconSet={'MaterialCommunity'}
                            />
                            <Text style={styles.formattedDate} >{formattedDate}</Text>
                        </View>
                        <View style={styles.favCountContainer}>
                            <Icon
                                icon={'heart'}
                                color={'#909090'}
                                size={15}
                            />
                            <Text style={styles.favCount}>{product.favCount}</Text>
                        </View>
                    </View>

                    <View style={styles.cityContainer}>
                        <Text style={styles.label}>{product.city}</Text>
                        <Icon
                            icon={'md-arrow-forward'}
                            style={{ marginHorizontal: 3, }}
                        />
                        <Text style={styles.label}>{product.state}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 5, marginVertical: 20, elevation: 4, borderWidth: 0.1, marginBottom: 20, }}>
                        <View>
                            {
                                messageRecipient.profilePicture ?
                                    <Image
                                        style={styles.profileImg}
                                        source={{ uri: messageRecipient.profilePicture }}
                                    />
                                    :
                                    <View style={styles.defaultProfileImgContainer} >
                                        <Text style={styles.defaultProfileImgText}>{messageRecipient.name.charAt(0).toUpperCase() + messageRecipient.surname.charAt(0).toUpperCase()}</Text>
                                    </View>
                            }
                        </View>

                        <View style={{ paddingHorizontal: 5, justifyContent: 'center' }}>
                            <Text>{messageRecipient.name} {messageRecipient.surname}</Text>
                        </View>
                    </View>


                </View>
            </ScrollView>
            {
                user.uid !== messageRecipient.uid &&
                <View style={{
                    flexDirection: 'row',
                    borderWidth: 0.3,
                    borderRadius: 28,
                    justifyContent: 'space-between',
                    marginBottom: 17,
                    marginTop: 15,
                    paddingHorizontal: 12,
                    marginHorizontal: 12,
                    borderColor: '#e5e8f9',
                    backgroundColor: '#fff',
                    paddingVertical: 0,
                    elevation:8,
                }}>
                    <TextInput
                        style={{
                            fontSize: 13,
                            color: '#3f4040',
                            alignSelf: 'center',
                            flex: 1,
                            paddingHorizontal:10,
                        }}
                        placeholder={'Mesaj Gönder'}
                        value={message}
                        onChangeText={setMessage}
                        multiline={true}
                    />
                    <Pressable onPress={sendMessage} style={{
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: '#d85a5a',
                        }}>Gönder</Text>
                    </Pressable>
                </View>
            }

        </View>
    );
}

export default ProductDetail;