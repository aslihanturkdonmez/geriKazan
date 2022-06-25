import React from 'react';
import { View } from 'react-native';
import { date } from '../../utils';
import Text from '../Text';
import styles from './MessageCard.style';

const MessageCard = ({message, user}) => {
    return (  
        <View style={message.from_uid !== user.uid ? styles.container_left : styles.container_right}>
            {
                message.from_uid !== user.uid &&
                <Text style={styles.user}>{message.from_user.name}</Text>
            }
            <View style={styles.inner_container}>
                <Text style={styles.message}>{message.message}</Text>
            </View>
            <Text style={styles.date}>{date(message.timestamp)}</Text>
        </View>
    );
}
 
export default MessageCard;