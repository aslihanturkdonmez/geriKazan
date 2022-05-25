import React, { useState, useEffect } from 'react';
import { View, Pressable, FlatList, ScrollView, Switch } from 'react-native';
import { Image, Text, TextInput, Header, Icon } from '../../components';
//import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {database} from '../../services';
import {Picker} from '@react-native-picker/picker';
import {cityState} from '../../resources';
import { useSelector } from 'react-redux';

const AddProduct = ({navigation}) => {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("0");
    const [unpaid, setUnpaid] = useState(true);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [cityPickerFocus, setCityPickerFocus] = useState(false);
    const [statePickerFocus, setStatePickerFocus] = useState(false);
    
    const user=useSelector(state => state.user);
    useEffect(() => {
      console.log(user);
    }, [user])
    

    const toggleSwitch = () => {
        if(unpaid) setPrice("0");
        setUnpaid(!unpaid)        
    }

    const pickImage = () => {
        ImagePicker.openPicker({
            //width: 300,
            //height: 400,
            //cropping: true,
            multiple:true,
            mediaType:'photo',

          }).then(img => {
            let temp_img=[];

            img.map((i, index)=>{
                temp_img.push({[`img${index}`]:i.path})
            })

            setImages(temp_img)
          });

          //console.log(images);

/*         const options = {
            maxHeight: 500,
            maxWidth: 500,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        };

        ImagePicker.launchImageLibrary(options, response => { 
            console.log(response.assets);  
            const source = response.assets[0].uri;
            setImage(source);
            
          }); */
    }

    const handlePost = () => {
        database.posts.createPost({
            title:title.trim(),
            description: description.trim(),
            price,
            city:selectedCity,
            state:selectedState,
            localUri: images,
        })
        .then((ref) => {
            setImages(null);
            setDescription("");
        })
        .catch((err) => {
            console.log(err);
        });

        //navigation.navigate()
        navigation.goBack();
    }

    const renderImages = ({item, index}) => {
        return (
            <View style={{marginRight:10, }}>
                <Pressable>
                    <Image 
                        source={{uri:item[`img${index}`] }}
                        style={{width:85, height:85, borderRadius:9,borderWidth:0.2, borderColor:'#cecece'}}
                        />
                </Pressable>
                
            </View>
        )
    }

    const renderHeaderComponent = () => {
        return(
            <Header styleContainer={{justifyContent: 'space-between', backgroundColor:'white', paddingVertical:8, paddingHorizontal:20,}}>
                    <Pressable onPress={()=>navigation.goBack()}>
                        <Icon 
                            icon={"md-close-sharp"}
                            size={25}
                            color='black'
                        />
                    </Pressable>
                    <Text style={{fontSize:24, fontWeight:'bold', color:'black'}}>İlan Detayı</Text>
                    <View />
            </Header>
        )
    }


    const cityPickerItemComponent = () => {
        return (
            Object.keys(cityState).map((city) => {
                return <Picker.Item label={city} value={city} key={city}/>
            })
        )
    } 

    const statePickerItemComponent = () => {
        return (
            cityState[selectedCity] ? 

            cityState[selectedCity].map((s) => {
                return <Picker.Item label={s} value={s} key={s}/>
            })
            :
            undefined
        )
    } 

    return (  
        <View style={{flex:1, backgroundColor:'#fff'}}>
            {/* {renderHeaderComponent()} */}
            <ScrollView
                stickyHeaderIndices={[0]}
            >
                {renderHeaderComponent()}
                <View style={{paddingHorizontal:15, paddingVertical: 10, backgroundColor:'#fefefe'}}>
                    <FlatList
                        data={images}
                        renderItem={renderImages}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{marginBottom: 20,}}
/*                         ItemSeparatorComponent={() => {
                            return (
                                <View style={{width:5}}/>
                            )
                        }} */
                        ListFooterComponent={() =>{
                            return (
                                <Pressable 
                                onPress={pickImage} 
                                style={{width:90, height:90, borderWidth:0.5, borderColor:'black', borderRadius:10, alignItems:'center', justifyContent:'center', marginRight:5,}}>
                                    <Text style={{fontSize:36}}>+</Text>
                                </Pressable>
                            )
                        }}
                    />

                    <TextInput 
                        style={{ marginBottom:22,paddingHorizontal: 17, backgroundColor:'#ececec', fontWeight:'bold', borderRadius:8, fontSize:16}}
                        placeholder="Başlık*"
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor={'black'}
                    />
                    <TextInput 
                        style={{ marginBottom:22,paddingHorizontal: 17, backgroundColor:'#ececec', fontWeight:'bold', borderRadius:8, fontSize:16}}
                        placeholder="Açıklama*"
                        multiline={true}
                        value={description}
                        onChangeText={setDescription}
                        placeholderTextColor={'black'}
                    />

                    {
                        !unpaid &&
                        <TextInput
                        style={{ marginBottom:22,paddingHorizontal: 17, backgroundColor:'#ececec', fontWeight:'bold', borderRadius:8, fontSize:16}}
                        placeholder="Fiyat*"
                        value={price}
                        onChangeText={setPrice}
                        placeholderTextColor={'black'}
                        keyboardType='number-pad'
                        />
                    }

                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:22,paddingHorizontal: 17,}}>
                        <Text style={{ fontWeight:'bold', borderRadius:8, fontSize:16, color:'black'}}>Ücretsiz</Text>
                        <Switch 
                            trackColor={{ false: "#767577", true: "red" }}
                            thumbColor={unpaid ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={unpaid}
                        
                        />
                    </View>
                    <Picker 
                        selectedValue={selectedCity}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCity(itemValue)
                        }
                        prompt="Şehir Seçiniz"
                        onFocus={() =>setCityPickerFocus(true)}
                        onBlur={() => setCityPickerFocus(false)}
                    >
                        {
                            !cityPickerFocus && !selectedCity &&
                            <Picker.Item label="Şehir seçiniz" value={null} enabled={false} />
                        }
                        {cityPickerItemComponent()}
                    </Picker>

                    <Picker
                        selectedValue={selectedState}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedState(itemValue)
                        }
                        prompt="İlçe Seçiniz"
                        onFocus={() =>setStatePickerFocus(true)}
                        onBlur={() => setStatePickerFocus(false)}
                        enabled={!!selectedCity}
                    >
                        {
                            !statePickerFocus && !selectedState &&
                            <Picker.Item  label="İlçe seçiniz" value={null} enabled={false} />
                        }
                        {statePickerItemComponent()}
                    </Picker>

                </View>
            </ScrollView>
            <Pressable onPress={handlePost} style={{backgroundColor:'red', marginHorizontal:20, marginBottom:20, alignItems:'center', borderRadius:20, paddingVertical:5,}}>
                <Text style={{fontSize:23, color:'white', fontWeight:'bold'}}>Gönder</Text>
            </Pressable> 
        </View>
    );
}
 
export default AddProduct;