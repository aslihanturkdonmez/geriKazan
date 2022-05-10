import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Image, Text, TextInput } from '../../components';
import * as ImagePicker from 'react-native-image-picker';
import {database} from '../../services';

const AddProduct = ({navigation}) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const pickImage = () => {
        const options = {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        };

        ImagePicker.launchImageLibrary(options, response => {   
            const source = response.assets[0].uri;
            setImage(source);
            
          });
    }

    const handlePost = () => {
        console.log(image);
        database.posts.createPost({
            text: text.trim(),
            localUri: image,
        })
        .then((ref) => {
            setImage(null);
            setText("");
        })
        .catch((err) => {
            console.log(err);
        });

        navigation.goBack();


    }

    return (  
        <View>
            <View style={{marginHorizontal:20, marginVertical: 10, borderRadius:10, backgroundColor:'#fefefe', height:200}}>
                <TextInput 
                    style={{ padding: 10,}}
                    placeholder="Gönderi paylaş..."
                    multiline={true}
                    value={text}
                    onChangeText={setText}
                />
                <Pressable onPress={pickImage}>
                    <Text>Foto seç</Text>
                </Pressable>
                <Image 
                    source={{uri: image}}
                    style={{width:200, height:200}}
                />

                <Pressable onPress={handlePost}>
                    <Text>Gönder</Text>
                </Pressable>
            </View>
        </View>
    );
}
 
export default AddProduct;