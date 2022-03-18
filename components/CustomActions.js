import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useActionSheet } from '@expo/react-native-action-sheet';
// import expo imagepicker & expo location
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
// import firebase packages
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const CustomActions = (props) => {
    // Alternate for actionsheet HOC, this works with React 16.8 or newer.
    const { showActionSheetWithOptions } = useActionSheet();

    // function that handles communication features btn onPress
    const onActionPress = () =>{
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel'
        ];
        const cancelButtonIndex = options.length -1;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch(buttonIndex){
                    case 0:
                        return imagePicker();
                    case 1:
                        return takePhoto();
                    case 2:
                        return getLocation();
                }
            }
        );

    }

    /* 
        @imagePicker functions
        -- Let's the user pick an image from the device's image library  
        -- Calls upload to firebase functions , later adds the url to messages      
    */
    const imagePicker = async () => {
        try{
            // pick image 
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
            }).catch( error => console.log(error));

            // if user selects the image
            if(!result.cancelled){
                // upload image to firebase
                const url = await uploadImageFetch(result.uri);
                console.log('select pic url', url);
                props.onSend({image: url});
            }
        }catch(err){
            console.log(err);
        }
    }

    /* 
        @takePhoto -- Lets user take the photo from users device
    */
    const takePhoto = async () => {
        try{
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: 'Images',
            }).catch( error => console.log(error));
    
            if(!result.cancelled){
                // upload image to firebase
                const url = await uploadImageFetch(result.uri);
                console.log('take pic url', url);
                props.onSend({image: url});
            }
        }catch(err){
            console.log(err);
        }
    }

    /*
        @getLocation -- get the location of the user by using GPS
    */
    const getLocation = async () => {
        try{
            const { status } = await Location.requestForegroundPermissionsAsync();

            if( status === 'granted'){
                let result = await Location.getCurrentPositionAsync({})
                                    .catch( err => console.log(err));
            
                // extract longitude & latitude
                if(result){
                    const { longitude, latitude } = result.coords;
                    props.onSend({
                        location: {
                            longitude,
                            latitude,
                        }
                    });
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    /*     
        Upload images to firebase
    */
    const uploadImageFetch = async (uri) => {
        const imageNameBefore = uri.split('/');
        const imageName = imageNameBefore[imageNameBefore.length -1];
    
        // converting image file to blob
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.onerror = (error) => {
                console.log(error);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        // Get a reference to the storage service, which is used to create references in your storage bucket
        const storage = getStorage();
        // ref now points to "imag/${imageName}.jpg"
        const storageRef = ref(storage, `images/${imageName}`);
        const response = await uploadBytes(storageRef, blob);
        blob.close();

        return await getDownloadURL(storageRef).then(url => url)
    }

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => onActionPress()}>
            <View style={styles.wrapper}>
                <Text style={styles.iconText}>
                    +
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginRight: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: 'blue',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
});

CustomActions.contextTypes ={
    actionSheet: PropTypes.func,
};

export default CustomActions;