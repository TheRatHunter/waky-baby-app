// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, Image, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createAppContainer, DrawerActions } from 'react-navigation'
import SettingsPage from '../Components/SettingsPage'
import MainPage from '../Components/MainPage'

const HamburgerNavigation = createDrawerNavigator(
    {
        MainPage: {
            screen: MainPage,
        },
        SettingsPage: {
            screen: SettingsPage,
        }
    }, {}
)

const DrawerMenu = createAppContainer(HamburgerNavigation)

const mainStack = createStackNavigator({
    MainNavigation: {
        screen: DrawerMenu,
        navigationOptions: ({navigation}) => ({
            headerStyle: {backgroundColor: '#4C3E54'},
            title: 'Welcome!',
            headerTintColor: 'white',
            headerLeft: <Text onPress={() => navigation.openDrawer()}>Menu</Text>,
        })
    }
})

const MainNavigator = createAppContainer(mainStack)



const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default MainNavigator