import React, { Component } from 'react';
// importing gifted chat packages
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { View, 
         StyleSheet, 
         Platform,
         KeyboardAvoidingView } from 'react-native';
// importing firebase packages
import { initializeApp,
         getApp } from "firebase/app";
import { getAuth, 
         onAuthStateChanged,
         signInAnonymously } from 'firebase/auth';
import { getFirestore,
         collection,
         onSnapshot,
         addDoc,
         query,
         orderBy, } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomAction from './CustomActions';
 
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA45SETQPSU7thswCrS7DWXr0o_OZfhsEU",
    authDomain: "chatapp-69e1c.firebaseapp.com",
    projectId: "chatapp-69e1c",
    storageBucket: "chatapp-69e1c.appspot.com",
    messagingSenderId: "1036267190211",
    appId: "1:1036267190211:web:cbb4a4a93ff98b9df62f76"
};

// chat component changes its background to the color chosen by the user in the start screen and displays user name entered as navigation title
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
            isConnected: false,
        }

        // check and initialize firebase 
        getApp.length === 0 ? initializeApp(firebaseConfig) : getApp();
        this.referenceChatList = null;
    }
    
    componentDidMount(){
        // setting screen title
        let { username } = this.props.route.params;
        this.props.navigation.setOptions({ title: username });

        // checking internet connection
        NetInfo.fetch().then(connection => {
            if(connection.isConnected){
                console.log('Online');
                this.setState({ isConnected: true});
                // fetch data from firestore
                this.fetchServerData();
            }else{
                console.log('Offline');
                this.setState({ isConnected: false});
                // get messages from local storage
                this.getMessages();
            }
        }); 
    }

    fetchServerData = () =>{ 
        let { username } = this.props.route.params;      
        // creating the query to load messages and listen for new ones.
        this.referenceChatList = query(collection(getFirestore(), 'messages'));

        // listen to authentication events
        const auth = getAuth();
        this.authUnsubscribe = onAuthStateChanged( auth, async(user) => {
            if(user){
                const uid = user.uid;

                // update user state with currently active user data
                this.setState({
                    uid,
                    messages: [],
                    user: {
                        _id: uid,
                        name: username,
                        avatar: 'https://placeimg.com/140/140/any'
                    }
                });

                // creating the query to load messages and listen for new ones.
                this.referenceChatlistUser = query(collection(getFirestore(), 'messages'), orderBy('createdAt', 'desc'));
                // listen for collection changes for current user 
                this.unsubscribeChatListUser = onSnapshot(this.referenceChatlistUser , this.loadMessages);
            }else {
                await signInAnonymously(auth);
            }      
        });
    }

    componentWillUnmount(){
        // stop listening to authentication
        this.authUnsubscribe();
        // stop listening for changes
        this.unsubscribeChatListUser();
    }

    loadMessages = (querySnapshot) => {
        const messages = [];
        //go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            const data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text || '',
                createdAt: data.createdAt.toDate(),
                user:{
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
                image: data.image || null,
                location: data.location || null,
            });      
        });

        // update the messages data on reload 
        this.setState((prevState) => ({
            ...prevState,
            messages,
        }));
    }

    //adding new message to the collection
    addMessage = async (message) => {
        await addDoc(this.referenceChatList, {
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: message.user,
            image: message.image || null,
            location: message.location || null,
        });
    }

    // onClick of gifted chat send
    onSend = (message=[]) => {
        // update local state
        this.setState(
            (prevState) => ({
                messages: GiftedChat.append(prevState.messages, message)
            }),
            // update firestore
            () => {
                this.saveMessages();
                this.addMessage(message[0]);
            }
        );
    }

    // appearance of message boxes
    renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                      color: 'white',
                    },
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#CC5500'
                    }
                }}
            />
        );
    }

    // changing appearance of input tool bar based on online or offline status
    renderInputToolbar = (props) => {
        if(this.state.isConnected)
            return <InputToolbar {...props} />;
    }

    // async storage methods for accessing data offline
    saveMessages = async () => {
        try{
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        }catch(error){
            console.log(error.message);
        }
    }

    getMessages = async () => {
        let messages = '';
        try{
            messages = AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        }catch(error){
            console.log(error.message);
        }
    }

    deleteMessages = async () => {
        try{
            await AsyncStorage.removeItem('messages');
        }catch(error){
            console.log(error.message);
        }
    }

    // dispalys the communication features
    renderCustomAction = (props) =>{
        return <CustomAction {...props} />;
    }

    // dispaly maps from longitude and latitude
    renderCustomView = ({ currentMessage }) => {
        const { location } = currentMessage;

        if(!!location){
            const { longitude, latitude } = location;
            return(
                <MapView
                    style={{width: 200, height: 150, borderRadius: 10, margin: 5}}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            )
        }
    }

    render() { 
        const { bgColor } = this.props.route.params;

        return (
            <View style={[styles.container, {backgroundColor: bgColor}]}>
               <GiftedChat
                    renderBubble={this.renderBubble}
                    messages={this.state.messages}
                    onSend={(message) => this.onSend(message)}
                    renderInputToolbar={this.renderInputToolbar}
                    renderCustomView={this.renderCustomView}
                    renderActions={this.renderCustomAction}
                    user={this.state.user}
                />
                {
                    Platform.OS === 'android' 
                    ? 
                    (<KeyboardAvoidingView behavior='height' />) 
                    : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;