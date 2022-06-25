import React from 'react';
import { View, Pressable } from 'react-native';
import { date } from '../../utils';
import Header from '../Header';
import Image from '../Image';
import Text from '../Text';
import styles from './MessageListCard.style';

const MessageListCard = ({data, user, onPress}) => {
    return (  
        <View>
            <Pressable onPress={()=> onPress(data)}>
                { data.to_uid !== user.uid ?
                    <View style={styles.profileInfoContainer}>
                        <View>
                            {
                                data.to_user.profilePicture ?
                                    <Image 
                                    style={styles.profileImg}
                                    source={{uri: data.to_user.profilePicture}}
                                    />
                                    :
                                    <View style={styles.defaultProfileImgContainer} >
                                        <Text style={styles.defaultProfileImgText}>{data.to_user.name.charAt(0).toUpperCase()+data.to_user.surname.charAt(0).toUpperCase()}</Text>
                                    </View>
                            }
                        </View>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>{data.to_user.name +' '+data.to_user.surname}</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{flex:1,}}>{data.from_uid === user.uid ? "Sen: "+data.last_message : data.last_message}</Text>
                                <Text style={{alignSelf: 'flex-end', fontSize:12, flex:0.4, marginBottom: -5,}}>{date(data.timestamp)}</Text>
                            </View>
                        </View>
                    </View>
                :
                    <View style={styles.profileInfoContainer}>
                        <View>
                            {
                                data.from_user.profilePicture ?
                                    <Image 
                                    style={styles.profileImg}
                                    source={{uri: data.from_user.profilePicture}}
                                    />
                                    :
                                    <View style={styles.defaultProfileImgContainer} >
                                        <Text style={styles.defaultProfileImgText}>{data.from_user.name.charAt(0).toUpperCase()+data.from_user.surname.charAt(0).toUpperCase()}</Text>
                                    </View>
                            }
                        </View>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>{data.from_user.name +' '+data.from_user.surname}</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{flex:1,}}>{data.from_uid === user.uid ? "Sen: "+data.last_message : data.last_message}</Text>
                                <Text style={{alignSelf: 'flex-end', fontSize:12, flex:0.4, marginBottom: -5, textAlign:'right'}}>{date(data.timestamp)}</Text>
                            </View>
                        </View>
                    </View>
                }
            </Pressable>
        </View>
    );
}
 
export default MessageListCard;