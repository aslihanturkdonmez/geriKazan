import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    innerContainer:{
        flex:1,
        justifyContent:'space-evenly',
    },
    profileInfoContainer:{
        flexDirection:'row', 
        alignItems:'stretch', 
        marginHorizontal:20,
        elevation:8,
        shadowColor:'#000',
        shadowRadius:4,
        backgroundColor:'#fff',
        padding:14,
    },

    profileImg:{
        width:60, 
        height:60, 
        backgroundColor:'purple', 
        borderRadius:68, 
        alignItems:'center', 
        justifyContent:'center'
    },
    defaultProfileImgContainer:{
        width:60, 
        height:60, 
        backgroundColor:'purple', 
        borderRadius:68, 
        alignItems:'center', 
        justifyContent:'center'
    },
    defaultProfileImgText:{
        color:'white', 
        fontWeight:'500', 
        fontSize:27,
    },
    userNameContainer:{
        flex:1,
        marginLeft:14, 
        justifyContent:'space-evenly'
    },
    userName:{
        fontWeight:'bold', 
        fontSize:18, 
        color:'#000'
    },
    userMail:{
        fontSize:15,
    },
    menu:{
        marginHorizontal:20,
        elevation:8,
        shadowColor:'#000',
        borderColor:'#fff',
        //padding:6,
        backgroundColor:'#fff',
    },
    cardWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:0.2,
        borderTopWidth:0.2,
        borderColor:'#cecece',
        padding:15,
    },
    menuCard:{
        flexDirection:'row',
        alignItems:'center',
        paddingRight:15,
    },
    icon:{
        marginRight:8,
    },
    menuText:{
        fontSize:18, 
        marginLeft: 5,
        color:'#000',
    }

    
});

export default styles;