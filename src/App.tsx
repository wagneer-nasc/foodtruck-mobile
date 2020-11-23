import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

import AppProvider from './auth';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#312e38" />
            <AppProvider>
                <View style={{ flex: 1, backgroundColor: '#7159c1' }} >
                    <Routes />
                </View>
            </AppProvider>
        </NavigationContainer>
    )
}

export default App;