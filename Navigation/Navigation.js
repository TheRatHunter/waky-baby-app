// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import SettingsPage from '../Components/SettingsPage'
import MainPage from '../Components/MainPage'



const navStackMain = createStackNavigator({
    MainPage: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: MainPage,
        navigationOptions: {
            title: 'Waky Baby'
        }
    }


})

const MainStackNavigator = createAppContainer(navStackMain)

const navStackSettings = createStackNavigator({
    Settings: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: SettingsPage,
        navigationOptions: {
            title: 'Settings'
        }
    }
})

const SettingsStackNavigator = createAppContainer(navStackSettings)

const HamburgerNavigation = createBottomTabNavigator(
    {
        MainPage: {
            screen: MainStackNavigator,
            navigationOptions: {
            }
        },
        SettingsPage: {
            screen: SettingsStackNavigator,
            navigationOptions: {
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true
        }
    }
)

const MainNavigator = createAppContainer(HamburgerNavigation)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})


export default MainNavigator