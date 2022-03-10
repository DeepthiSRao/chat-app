import React, { Component } from 'react';
// importing gifted chat packages
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { View, 
         Text, 
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
            }
        }

        // check and initialize firebase 
        getApp.length === 0 ? initializeApp(firebaseConfig) : getApp();
        this.referenceChatList = null;
    }
    
    componentDidMount(){
        //setting screen title
        let { username } = this.props.route.params;
        this.props.navigation.setOptions({ title: username });
        
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
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user:{
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
            });      
        });

        // update the messages data on reload 
        this.setState({
            messages,
        });
    }

    //adding new message to the collection
    addMessage = async (message) => {
        await addDoc(this.referenceChatList, {
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            user: message.user,
        });
    }

    onSend = (message=[]) => {
        // update local state
        this.setState(
            (prevState) => ({
                messages: GiftedChat.append(prevState.messages, message)
            }),
            // update firestore
            () => {
                this.addMessage(message[0]);
            }
        );
    }

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

    render() { 
        const { bgColor } = this.props.route.params;

        return (
            <View style={[styles.container, {backgroundColor: bgColor}]}>
               <GiftedChat
                    renderBubble={this.renderBubble}
                    messages={this.state.messages}
                    onSend={(message) => this.onSend(message)}
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