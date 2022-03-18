import React from 'react';
// importing react navigation packages
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// importing the screen component
import Start from './components/Start';
import Chat from './components/Chat';
// importing action sheet provider
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
// create navigator
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ActionSheetProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Start}
                    />
                    <Stack.Screen
                        name="Chat"
                        component={Chat} />
                </Stack.Navigator>           
            </NavigationContainer>
        </ActionSheetProvider>
    );
}