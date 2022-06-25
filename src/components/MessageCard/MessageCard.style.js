import { StyleSheet } from 'react-native';

const container=StyleSheet.create({
    cnt:{
        flex:1,
        marginBottom:10,
        padding:5,
        borderRadius:8,
        minWidth:80,
    },
})

export default StyleSheet.create({
    container_left:{
        ...container.cnt,
        marginLeft:10,
        alignSelf:'flex-start',
        flex:1,
        backgroundColor:'#ffffff',
        alignItems:'flex-start',
    },
    container_right:{
        ...container.cnt,
        alignSelf:'flex-end',
        marginRight:10,
        flex:1,
        backgroundColor:'#d9fdd3',
        alignItems:'flex-start',

    },
    inner_container:{
        flex:1,
        flexDirection:'row',
        paddingLeft:5,
        alignItems:'flex-end',
        justifyContent:'space-around',
        paddingRight:5,
        maxWidth:250,
    },
    message:{
        fontSize:15,
        marginRight:15,
    },
    date:{
        fontSize:10,
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        paddingTop:5,
    },
    user:{
        paddingLeft:5,
        color:'red',

    }
});