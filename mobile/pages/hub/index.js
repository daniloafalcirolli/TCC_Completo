import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Services from '../list_services/index.js';
import Home from '../home/index.js';
import Funcionario from '../funcionario/index.js';
import CServices from '../create_services/index.js';

import { mainColor } from '../../config';

const Tab = createMaterialBottomTabNavigator();

export default function Hub(){
    return(
        <Tab.Navigator
            activeColor={mainColor}
            inactiveColor="#e7e7e7"
            barStyle={{ backgroundColor: '#fff' }}
        >
            <Tab.Screen
                name="Serviços"
                component={Services}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="account-hard-hat" color={color} size={20} />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Novo Serviço"
                component={CServices}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="clipboard-plus" color={color} size={20} />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Funcionario"
                component={Funcionario}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={20} />
                    ),
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}