import { StyleSheet, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
    },
    brandText:{
        fontSize:25,
        textAlign:'center',
    },
    imgContainer:{
        flex:1,
        alignItems:'center', 
        justifyContent:'center'
    },
    logo:{
        width:Dimensions.get('screen').width/1.2,
        height:Dimensions.get('screen').height/4,
        backgroundColor:'transparent',
    },
    modalContainer:{
        flex:1, 
        backgroundColor:'#d0e1d0', 
        borderTopLeftRadius:38, 
        borderTopRightRadius:38,  
        paddingTop:30, 
        justifyContent:'space-evenly',
    },
    loginText:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'300',
        marginHorizontal:20,
        fontWeight:'500',
        color:'#404040',
        paddingVertical:5,
    },
    textInputContainer:{
    },
    textInputMail:{
        marginHorizontal:30,
        marginVertical:10,
        borderRadius:9,
        backgroundColor:'#fff',
        padding:12,
        height:45,
    },
    passwordContainer:{
        flexDirection:'row',             
        justifyContent:'space-between',
        marginHorizontal:30,
        marginVertical:10,
        borderRadius:9,
        paddingHorizontal:12,
        backgroundColor:'#fff',
        alignItems:'center',
        height:45,
    },
    textInputPassword:{
        flex:1,
    },
    loginContainer:{
        flexDirection:'row', 
        justifyContent:'center',
    },
    isMember:{ 
        color:'#8c8c8c', 
        fontWeight:'600'
    },
    login:{
        color:'#59835e', 
        fontWeight:'bold'
    },
});

export default styles;