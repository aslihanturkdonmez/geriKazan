import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyIcon = ({iconSet="Ionicons", icon, size, color, style, onPress }) => {

    const defineIconSet = () => {

        switch (iconSet) {
            case 'MaterialCommunity':
                return <MaterialCommunityIcons name={icon} size={size} color={color} style={style} onPress={onPress} />
        
            case 'Ionicons':
                return <Ionicons name={icon} size={size} color={color} style={style} onPress={onPress} />
    
            default:
                return null;
        }

    }

    return (
            defineIconSet()
    );
}
 
export default MyIcon;

