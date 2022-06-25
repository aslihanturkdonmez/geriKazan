import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    profileInfoContainer:{
        flexDirection:'row', 
        alignItems:'stretch', 
        shadowColor:'#000',
        shadowRadius:4,
        padding:14,
        backgroundColor:'#fff',
        borderBottomWidth:0.7,
        borderColor:'#cecece',
    },
    profileImg:{
        width:60, 
        height:60, 
        backgroundColor:'#1f7a1f', 
        borderRadius:68, 
        alignItems:'center', 
        justifyContent:'center',
    },
    defaultProfileImgContainer:{
        width:60, 
        height:60, 
        backgroundColor:'#1f7a1f', 
        borderRadius:68, 
        alignItems:'center', 
        justifyContent:'center'
    },
    defaultProfileImgText:{
        color:'white', 
        fontWeight:'500', 
        fontSize:24,
    },
    userNameContainer:{
        flex:1,
        marginLeft:14, 
        justifyContent:'space-evenly',
    },
    userName:{
        fontWeight:'bold', 
        fontSize:18, 
        color:'#000'
    },
});

export default styles;