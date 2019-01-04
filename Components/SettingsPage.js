import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native';
import WBColors from "../Styles/Colors";

class SettingsPage extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Paramètres',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../Images/settings.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text>bbb</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default SettingsPage