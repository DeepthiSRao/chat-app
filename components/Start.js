import React, { Component } from 'react';
import { Text, 
         View, 
         ImageBackground, 
         StyleSheet, 
         TextInput, 
         Image, 
         Pressable,
         TouchableOpacity } from 'react-native';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            bgColor: ''
        };
    }

    // onPress of color platte
    changeColor = (newColor) =>{
        this.setState({ bgColor: newColor});
    }

    render() {
        // background image and icon referrencing
        const image = require("../assets/images/Background.png");
        const userIcon = require("../assets/images/icon.svg");

        // background color platte options
        const colors = {
            color1: "#090C08",
            color2: "#474056",
            color3: "#8A95A5",
            color4: "#B9C6AE",
        };

        return (
            <View style={styles.container}>
                <ImageBackground 
                    source={image} 
                    style={styles.image}
                    resizeMode="cover" >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>App Title</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.textInputContainer}>
                            <Image
                                source={userIcon} 
                                style={styles.userIcon} />
                            <TextInput
                                accessible={true}
                                value={this.state.username}
                                placeholder="Your Name"
                                onChangeText={(username) => this.setState({username})}
                            />
                        </View>
                        <View style={styles.colorPaletteContainer}>
                            <Text style={styles.colorPaletteText}>Choose Background Color: </Text>
                            <View style={styles.colorPalette} >
                                <TouchableOpacity
                                    onPress={() => this.changeColor(colors.color1)}
                                >
                                    <View style={[styles.color, styles.color1]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.changeColor(colors.color2)}
                                >
                                    <View style={[styles.color, styles.color2]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.changeColor(colors.color3)}
                                >
                                    <View style={[styles.color, styles.color3]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.changeColor(colors.color4)}
                                >
                                    <View style={[styles.color, styles.color4]}></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Pressable
                            style={styles.chatBtn}
                            onPress={()=> this.props.navigation.navigate('Chat',{
                                username: this.state.username,
                                bgColor: this.state.bgColor
                            })}>
                            <Text style={styles.chatBtnText}>
                                Start Chatting
                            </Text>
                        </Pressable>                 
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        justifyContent: 'center',
        flex: 1,
    },
    titleContainer: {
        height: '44%'
    },
    title: {
        textAlign: 'center',
        fontSize: 45,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 10,
    },
    formContainer: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 10,
        height: '44%',
        width: '88%',
        justifyContent: 'space-evenly'
    },
    //text input container
    textInputContainer: {
        flexDirection: 'row',
        borderColor: '#757083',
        borderWidth: 1,
        padding: 10,
        width: '100%'
    },
    userIcon: {
        height: 20,
        width: 20,
        marginRight: 10,
        alignItems: 'center',
    },
    // color platte container css
    colorPaletteContainer: {
        flexDirection: 'column',
    },
    colorPaletteText: {
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
    },
    colorPalette: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    color: {
        width: 50,
        height: 50,
        marginRight:16,
        borderRadius: 50/2,
    },
    color1:{
        backgroundColor: '#090C08'
    },
    color2:{
        backgroundColor: '#474056'
    },
    color3:{
        backgroundColor: '#8A95A5'
    },
    color4:{
        backgroundColor: '#B9C6AE'
    },
    // chat button css
    chatBtn: {
        backgroundColor: '#757083',
    },
    chatBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        padding: 16,
    }
});


export default Start;