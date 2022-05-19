import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:Platform.OS === "ios" ? 44 : StatusBar.height,
        elevation:10,
        shadowOffset:{
            width:0,
            height:0
        },
        shadowOpacity:0.2,
        shadowColor:'black',
        shadowRadius:8,
        paddingVertical:3,    
        backgroundColor:'#fff', 
    }
});

export default styles;