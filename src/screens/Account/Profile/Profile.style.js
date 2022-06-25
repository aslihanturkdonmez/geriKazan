import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    profilePictureContainer:{
        alignItems:'center', 
        marginTop:10,
    },
    profilePic:{
        width:103, 
        height:103, 
        borderRadius:60,
    },
    defaultProfilePicContainer:{
        width:103, 
        height:103, 
        backgroundColor:'purple', 
        borderRadius:68, 
        alignItems:'center', 
        justifyContent:'center'
    },
    defaultProfilePicText:{
        color:'white', 
        fontWeight:'bold', 
        fontSize:40,
    },
    editProfilePicIcon:{
        backgroundColor:'#c2c2c2', 
        position: 'absolute', 
        zIndex: 1, 
        left:200, 
        top:70, 
        borderRadius:20, 
        padding:4 
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
    },
    menu:{
        elevation:8,
        shadowColor:'#000',
        borderColor:'#fff',
        //padding:6,
        backgroundColor:'#fff',
        marginVertical:20,
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

});

export default styles;