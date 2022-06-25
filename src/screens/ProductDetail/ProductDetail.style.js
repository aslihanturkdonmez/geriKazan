import { StyleSheet, Dimensions } from 'react-native';

const {width, height}=Dimensions.get('screen');

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    scrollContainer:{
        flex:1,
    },
    carouselContainer:{
        //Sticky header için
        marginTop:-50
    },
    paginationContainer:{ 
        flexDirection:'row', 
        height:25, 
        paddingTop:0, 
        paddingBottom:0, 
        backgroundColor: 'rgba(0, 0, 0, 0.65)', 
        position: 'absolute', 
        bottom:10, 
        borderRadius:20,
        alignSelf:'center',
    },
    paginationDot:{
        width: 8,
        height: 8,
        borderRadius: 5,
        paddingHorizontal: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
    },
    paginationInactiveDot:{

    },
    carouselImg:{
        width, 
        height:height/2
    },
    stickyHeaderContainer:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingHorizontal:13, 
        marginTop:13,
    },
    stickyHeaderIconContainer:{
        backgroundColor:'rgba(0, 0, 0, 0.4)', 
        borderRadius:20, 
        padding:5,
    },
    headerComponentContainer:{
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal:13,

    },
    headerComponentTitle:{
        margin:8, 
        fontSize:20, 
        alignSelf: 'center', 
        fontWeight:'bold'
    },
    infoContainer:{
        paddingHorizontal:20,
    },
    price:{
        fontWeight:'bold',
        fontSize:30,
        color:'#000',
    },
    innerContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10,
    },
    favBadgeContainer:{
        alignItems:'center',
    },
    favCount:{
        fontSize:14,
        marginLeft:5,
        color:'#909090',
    },
    title:{
        fontSize:27,
        fontWeight:'600',
        color:'#000',
    },
    dateContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    formattedDate:{
        paddingLeft:3,
        color:'#fe3449'
    },
    description:{
        flex:1,
        marginTop:5,
        fontSize:17,
        color:'#000',
    },
    cityContainer:{
        alignItems:'center',
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'center',
    },
    label:{
        textAlign:'center',
        backgroundColor:'#69b06f',
        paddingHorizontal:25,
        paddingVertical:3,
        borderRadius:20,
        color:'#fff',
    },
    favCountContainer:{
        flexDirection:'row',
        backgroundColor:'#f2f2f2',
        borderRadius:12,
        alignItems:'center',
        paddingHorizontal:15,
    },
    dateFavCountContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical: 10,

    },
    profileImg:{
        width:50, 
        height:50, 
        backgroundColor:'purple', 
        borderRadius:68, 
        alignItems:'center', 
        justifyContent:'center'
    },
    defaultProfileImgContainer:{
        width:40, 
        height:40, 
        backgroundColor:'purple', 
        borderRadius:68, 
        alignItems:'center', 
        justifyContent:'center'
    },
    defaultProfileImgText:{
        color:'#fff', 
        fontWeight:'500', 
        fontSize:21,
    },
    
});

export default styles;
