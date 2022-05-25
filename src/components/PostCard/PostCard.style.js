import { StyleSheet, Dimensions } from 'react-native';


const {width, height}=Dimensions.get('screen');

const styles = StyleSheet.create({
    container:{
        width: width / 2 - 16,
        height:height / 4 + 20,
        margin:8,
        //borderWidth:1,
        borderRadius:8,
        elevation:8,
        shadowOffset:{
            width:0,
            height:0
        },
        shadowOpacity:0.4,
        shadowColor:'#000',
        shadowRadius:4,
        backgroundColor:'#fff'
    },
    innerContainer:{
        flex:1,
        justifyContent:'space-between',
    },
    image:{
        flex:3,
        width:width / 2 - 16,
        height:height / 5,
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
    },
    textContainer:{
        flex:1,
        justifyContent:'space-around',
        paddingHorizontal:10,
        backgroundColor:'#fff',
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
    },

    title:{
        fontWeight:'500',
        fontSize:16,
    },
    price:{
        fontWeight:'bold',
        fontSize:17,
    },



});

export default styles;