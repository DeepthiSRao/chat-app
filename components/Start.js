import React, { Component } from 'react';
import { Text, 
         View, 
         ImageBackground, 
         StyleSheet, 
         Image,
         TextInput, 
         TouchableOpacity, 
         Pressable, } from 'react-native';

// background color platte options
const colors = {
    color1: "#ffadad",
    color2: "#fdffb6",
    color3: "#9bf6ff",
    color4: "#caffbf",
};

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
        const userIcon = require("../assets/images/icon.png");

        return (
            <View style={styles.container}>
                <ImageBackground 
                    source={image} 
                    style={styles.image}
                    resizeMode="cover" >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Chat App</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.textInputContainer}>
                            <Image
                                source={userIcon} 
                                style={styles.userIcon} />
                            <TextInput
                                accessible={true}
                                accessibilityLabel='Your name'
                                accessibilityHint='Enter the name you want for chat screen title'
                                style={styles.inputField}
                                value={this.state.username}
                                placeholder="Your Name"
                                onChangeText={(username) => this.setState({username})}
                            />
                        </View>
                        <View style={styles.colorPaletteContainer}>
                            <Text style={styles.colorPaletteText}>Choose Background Color: </Text>
                            <View style={styles.colorPalette} >
                                <TouchableOpacity
                                    accessibilityLabel='Pink background'
                                    accessibilityHint='Sets pink background for chat screen'
                                    accessibilityRole='button'
                                    onPress={() => this.changeColor(colors.color1)}
                                >
                                    <View style={[styles.color, styles.color1]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessibilityLabel='Yellow background'
                                    accessibilityHint='Sets yellow background for chat screen'
                                    accessibilityRole='button'
                                    onPress={() => this.changeColor(colors.color2)}
                                >
                                    <View style={[styles.color, styles.color2]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessibilityLabel='Blue background'
                                    accessibilityHint='Sets blue background for chat screen'
                                    accessibilityRole='button'
                                    onPress={() => this.changeColor(colors.color3)}
                                >
                                    <View style={[styles.color, styles.color3]}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessibilityLabel='Green background'
                                    accessibilityHint='Sets green background for chat screen'
                                    accessibilityRole='button'
                                    onPress={() => this.changeColor(colors.color4)}
                                >
                                    <View style={[styles.color, styles.color4]}></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Pressable
                            accessible={true}
                            accessibilityLabel='Start Chatting'
                            accessibilityHint='Click to start chatting'
                            accessibilityRole='Button'
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
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleContainer: {
        height: 'auto',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 10,
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 10,
        width: '88%',
        height: '44%',
        justifyContent: 'space-around',
        borderRadius: 10,
    },
    //text input container
    textInputContainer: {
        flexDirection: 'row',
        borderColor: '#757083',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    },
    inputField: {
        width: '100%',
        fontSize: 18,
    },
    userIcon: {
        height: 25,
        width: 25,
        marginRight: 10,
        alignItems: 'center',
    },
    // color platte container css
    colorPaletteContainer: {
        flexDirection: 'column',
    },
    colorPaletteText: {
        color: '#757083',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 10,
    },
    colorPalette: {
        flexDirection: 'row',
    },
    color: {
        width: 40,
        height: 40,
        marginRight:16,
        borderRadius: 40/2,
    },
    color1:{
        backgroundColor: colors.color1
    },
    color2:{
        backgroundColor: colors.color2
    },
    color3:{
        backgroundColor: colors.color3
    },
    color4:{
        backgroundColor: colors.color4
    },
    // chat button css
    chatBtn: {
        backgroundColor: '#757083',
        borderRadius: 5,
        padding: 16,
    },
    chatBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    }
});


export default Start;