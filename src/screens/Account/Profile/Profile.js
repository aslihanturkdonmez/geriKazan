import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text, Icon } from '../../../components';
import styles from './Profile.style';

const Profile = ({route}) => {

    const userInformation=route.params;

    const [user, setUser] = useState(userInformation);
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [mail, setMail] = useState(userInformation.mail);
    const [name, setName] = useState(userInformation.name);
    const [surname, setSurname] = useState(userInformation.surname);
    const [profilePicture, setProfilePicture] = useState(userInformation.profilePicture);

    return (  
        <View style={styles.container}>
            <View style={styles.profilePictureContainer}>
                { user?.profilePicture ?
                    <Image 
                    style={styles.profilePic}
                    source={{uri: user.profilePicture}}
                    />
                    :
                    <View style={styles.defaultProfilePicContainer} >
                        <Text style={styles.defaultProfilePicText}>{user.name.charAt(0)+user.surname.charAt(0)}</Text>
                    </View>
                }
                <View style={styles.editProfilePicIcon}>
                    <Pressable onPress={() => {}}>
                        <Icon 
                            iconSet='MaterialCommunity'
                            icon={"pencil-outline"}
                            size={22}
                            color={"white"}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
 
export default Profile;