// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import SettingsPage from '../Components/SettingsPage'
import MainPage from '../Components/MainPage'
import TestAlarmPage from '../Components/TestAlarmPage'

const drawerNavigator = createDrawerNavigator(
    {
        MainPage: {
            screen: MainPage,
        },
        SettingsPage: {
            screen: SettingsPage,
        },
        TestPage: {
            screen: TestAlarmPage,
        }
    }, {}
);

const drawerContainer = createAppContainer(drawerNavigator);

const mainStackNavigator = createStackNavigator({
    MainNavigation: {
        screen: drawerContainer,
        navigationOptions: ({navigation}) => ({
            headerStyle: {backgroundColor: '#4C3E54'},
            title: 'Waky Baby',
            headerTintColor: 'white',
            headerLeft:
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image
                        source={require('../Images/menu.png')}
                        style={[styles.icon]}
                        />
                </TouchableOpacity>
        })
    }
});

const MainStackContainer = createAppContainer(mainStackNavigator);

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        marginLeft: 15,
    }
});

export default MainStackContainer