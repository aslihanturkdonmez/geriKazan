import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:Platform.OS === "ios" ? 44 : StatusBar.height,
        elevation:10,
        shadowColor:'black',
        paddingVertical:3,    
        backgroundColor:'#fff',
        marginBottom:4, 
    }
});

export default styles;