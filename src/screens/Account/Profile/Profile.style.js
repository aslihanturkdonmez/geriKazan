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
        width:50, 
        height:50, 
        borderRadius:60,
    },
    defaultProfilePicContainer:{
        width:113, 
        height:113, 
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
        backgroundColor:'#cdcdcd', 
        position: 'absolute', 
        zIndex: 1, 
        left:220, 
        top:85, 
        borderRadius:20, 
        padding:4 
    },

});

export default styles;