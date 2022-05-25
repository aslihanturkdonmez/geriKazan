import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Icon, Image, Menu, Text } from '../../../components';
import { removeUser } from '../../../store/actions/UserAction';
import styles from './Account.style';

const Account = ({navigation}) => {
    const dispatch = useDispatch();
    const userInfo=useSelector(state => state.user);
    const [user, setUser] = useState(userInfo);


    const mainMenu = [
        {id:1, title: 'Profilim', icon:'person-outline', onPress: () => {handleNavigate('Profile', user)}},
        {id:2, title: 'Ürünlerim', icon:'cart-outline', onPress: () => {handleNavigate('MyProducts')}},
        {id:3, title: 'Ayarlar', icon:'settings-outline', onPress: () => {handleNavigate('Settings')}},
        
    ]

    const aboutMenu = [
        {id:1, title: 'Hakkında', icon:'ios-ellipsis-horizontal-outline', onPress: () => {handleNavigate('')}},
      /*   {id:2, title: 'Yardım', icon:'ios-bandage-outline', onPress: () => {handleNavigate('')}}, */
        {id:3, title: 'Sıkça Sorulan Sorular', icon:'ios-help-outline', onPress: () => {handleNavigate('')}},
        {id:4, title: 'Geri Bildirim', icon:'ios-checkmark-done-circle-outline', onPress: () => handleSignOut},
        {id:5, title: 'Çıkış Yap', icon:'ios-exit-outline', onPress: () => handleSignOut},

    ]

    const handleSignOut = () => {
        authentication.signOut();
        dispatch(removeUser());
    }

    const handleNavigate =(route, params) => {
        navigation.navigate(route, params);
    }
    

    return (  
        <View style={styles.container}>
            <Header styleContainer={{alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{margin:8, fontSize:20, alignSelf: 'center', fontWeight:'bold'}}>Hesabım</Text>
            </Header>
            <View style={styles.innerContainer}>
                <View style={styles.profileInfoContainer}>
                    <View>
                        { user.profilePicture ?
                            <Image 
                            style={styles.profileImg}
                            source={{uri: user.profilePicture}}
                            />
                            :
                            <View style={styles.defaultProfileImgContainer} >
                                <Text style={styles.defaultProfileImgText}>{user.name.charAt(0)+user.surname.charAt(0)}</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>{user.name +' '+user.surname}</Text>
                        <Text style={styles.userMail}>{user.mail}</Text>
                    </View>
                </View>

                <Menu 
                    menu={mainMenu}
                    iconSize={20}
                    iconColor={'#000'}
                    styleContainer={styles.menu}
                    styleInnerContainer={styles.menuCard}
                    styleIcon={styles.icon}
                    styleText={styles.menuText}
                    styleCardWrapper={styles.cardWrapper}
                />

                <Menu 
                    menu={aboutMenu}
                    iconSize={20}
                    iconColor={'#000'}
                    styleContainer={styles.menu}
                    styleInnerContainer={styles.menuCard}
                    styleIcon={styles.icon}
                    styleText={styles.menuText}
                    styleCardWrapper={styles.cardWrapper}
                />
            </View>
        </View>
    );
}
 
export default Account;