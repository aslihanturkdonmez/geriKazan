import React, { useState, useCallback } from 'react';
import { View, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Icon, Image, Menu, Text } from '../../../components';
import { removeUser } from '../../../store/actions/UserAction';
import styles from './Account.style';
import { useFocusEffect } from '@react-navigation/native';
import {authentication, database} from '../../../services';


const Account = ({navigation}) => {
    
    const dispatch = useDispatch();
    const userInfo=useSelector(state => state.user);
    const [user, setUser] = useState(userInfo);

    useFocusEffect(
        useCallback(() => {
            setUser(userInfo);
        }, [userInfo])
    );

    

      const mainMenu = [
          {id:1, title: 'Profilim', icon:'person-outline', onPress: () => {handleNavigate('Settings', user)}},
          {id:2, title: 'Ürünlerim', icon:'cart-outline', onPress: () => {handleNavigate('MyProducts', user)}},
          {id:3, title: 'Favorilerim', icon:'heart-outline', onPress: () => {handleNavigate('Favorites', user)}},
        
    ]
    
    const aboutMenu = [
        {id:1, title: 'Hakkında', icon:'md-information-circle-outline', onPress: () => {handleNavigate('About')}},
      /*   {id:2, title: 'Yardım', icon:'ios-bandage-outline', onPress: () => {handleNavigate('')}}, */
        {id:3, title: 'Geri Bildirim', icon:'chatbubble-ellipses-outline', onPress: () => {handleNavigate('Feedback', user)}},
        {id:4, title: 'Hesabımı Sil', icon:'md-person-remove-outline',  onPress: () => deleteAccount()},
        {id:5, title: 'Çıkış Yap', icon:'ios-exit-outline', onPress: () => signOut()},
    ]

    const signOut =async () => {
        Alert.alert(
            "Oturumu Kapat",
            "Hesabınızdan çıkış yapmak istediğinize emin misiniz?",
            [
                {
                    text: "Çıkış Yap",
                    onPress: () => authentication.signOut()
                },
                {
                    text: "Vazgeç",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
        
    }

    const deleteAccount =async () => {
        Alert.alert(
            "Hesabınız Kalıcı Olarak Silinecek",
            "Hesabınızı kalıcı olarak silmek istediğinize emin misiniz?",
            [
                {
                    text: "Hesabımı Sil",
                    onPress: () =>{
                        database.user.deleteAccount(user.uid);
                        authentication.deleteAccount();
                    }
                },
                {
                    text: "Vazgeç",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
        
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
                                <Text style={styles.defaultProfileImgText}>{user?.name.charAt(0).toUpperCase()+user?.surname.charAt(0).toUpperCase()}</Text>
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