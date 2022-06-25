import React, {useEffect, useState} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Text from '../Text';
import Image from '../Image';
import styles from './PostCard.style';
import FavBadge from '../FavBadge';

const PostCard = ({data, onPressProduct, favFlag, setFavorite}) => {
    const favFlagTemp=favFlag(data.id);
    const [favFlagV, setFavFlagV] = useState(favFlagTemp);

    useEffect(() => {
        setFavFlagV(favFlagTemp);
    }, [favFlagTemp]);

    

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => onPressProduct(data)}>
                <View style={styles.innerContainer}>
                    <FavBadge 
                        favFlag={favFlagTemp}
                        onPress={() => setFavorite(favFlagV, data.id, data.title, data.price, data.images[0], data.uid)}
                    />
                    {
                        data.favCount ?
                            <View style={{position:'absolute', zIndex:1, top:38, right:16, elevation:15, shadowColor: '#000',}}>
                                <Text style={{color:'#fff', fontSize:17,}}>{data.favCount}</Text>
                            </View>

                        :
                            undefined
                    }
                    <Image 
                        style={styles.image}
                        source={data.images[0]}
                        resizeMode={"cover"}
                        cache={true}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{data.title}</Text>
                        <Text style={styles.price}>{data.price === "0" ? "Ücretsiz" : "₺"+data.price}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
 
export default PostCard;
