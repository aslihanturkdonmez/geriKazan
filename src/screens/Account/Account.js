import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text, TextInput } from '../../components';
import {authentication, database} from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/actions/UserAction';


const Account = () => {
    const {user: userInfo}=useSelector(state => state.user);
    const [user, setUser] = useState(userInfo);

    const dispatch = useDispatch();


    useEffect(() => {
        console.log(userInfo)
      setUser(userInfo);
    }, [userInfo])


    const handleSignOut = () => {
        dispatch(removeUser());
        authentication.signOut();
    }

    return ( 
        <View>
            <View>
                <View style={{alignItems:'center', marginVertical:50,}}>

                    <View style={{width:120, height:120, backgroundColor:'gray', borderRadius:60, alignItems:'center', justifyContent:'center'}} >
                        <Text style={{color:'white', fontWeight:'bold', fontSize:35}}>AS</Text>
                    </View>

                </View>
                <TextInput 
                    placeholder={user.mail}
                    //text={user.mail}
                />
                <TextInput 
                    placeholder={user.mail}
                    //text={user.mail}
                />
            </View>
            <Pressable onPress={handleSignOut}>

                <Text >Account</Text>
            </Pressable>
                
        </View>
     );
}
 
export default Account;