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
        width:118, 
        height:118, 
        borderRadius:60,
    },
    defaultProfilePicContainer:{
        width:118, 
        height:118, 
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
        top:90, 
        borderRadius:20, 
        padding:4 
    },

});

export default styles;