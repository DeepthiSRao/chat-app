import React, { Component } from 'react';
import { View, Text } from 'react-native';

// chat component changes its background to the color chosen by the user in the start screen
class Chat extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        this.props.navigation.setOptions({ title: this.props.route.params.username});
    }

    render() { 
        const { bgColor } = this.props.route.params;
        
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: bgColor,
                }}
            >
            </View>
        );
    }
}
 
export default Chat;