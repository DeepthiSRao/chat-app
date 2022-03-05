import React, { Component } from 'react';
import { View, 
         Text, 
         StyleSheet } from 'react-native';

// chat component changes its background to the color chosen by the user in the start screen and displays user name entered as navigation title
class Chat extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        this.props.navigation.setOptions({ title: this.props.route.params.username});
    }

    render() { 
        const { bgColor, username } = this.props.route.params;
        
        return (
            <View style={[styles.container, {backgroundColor: bgColor}]}>
                <Text style={styles.text}>
                    Welcome {username} for Chat App
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        color: '#fff',
        fontSize: 45,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    }
});

export default Chat;