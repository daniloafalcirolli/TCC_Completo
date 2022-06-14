import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

import Login from './pages/login';
import Hub from './pages/hub/';
import Service from './pages/individual_service';
import Materials from './pages/materials/';
import ListServicesStatus from './pages/list_services_status/index.js';
import ServiceStatus from './pages/individual_service_status/index.js';
export default function App() {
    return (
        <NavigationContainer>
            <StatusBar
                animated={false}
                hidden={false}
            />
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="Hub" component={Hub} options={{headerShown: false}} />
                <Stack.Screen name="Materials" component={Materials} options={{headerShown: false}} />
                <Stack.Screen name="ListServicesStatus" component={ListServicesStatus} options={{headerShown: false}} />
                <Stack.Screen name="ServiceStatus" component={ServiceStatus} options={{headerShown: false}} />
                <Stack.Screen name="Service" component={Service} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}