import React, { Component } from 'react';
// importing gifted chat packages
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { View, 
         Text, 
         StyleSheet, 
         Platform,
         KeyboardAvoidingView} from 'react-native';
import mockData from '../utils/mockData';

// chat component changes its background to the color chosen by the user in the start screen and displays user name entered as navigation title
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }
    
    componentDidMount(){
        //setting screen title
        this.props.navigation.setOptions({ title: this.props.route.params.username});
        this.setState({
            messages : mockData,
        })
    }

    renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                      color: 'yellow',
                    },
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#E52B50'
                    }
                }}
            />
        );
    }

    onSend = (message=[]) => {
        this.setState((prevState) => ({
            messages: GiftedChat.append(prevState.messages, message)
        }));
    }

    render() { 
        const { bgColor, username } = this.props.route.params;
      
        return (
            <View style={[styles.container, {backgroundColor: bgColor}]}>
               <GiftedChat
                    renderBubble={this.renderBubble}
                    messages={this.state.messages}
                    onSend={(message) => this.onSend(message)}
                    user={{
                        _id: 1,
                    }}
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