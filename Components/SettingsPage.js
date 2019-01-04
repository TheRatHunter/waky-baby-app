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
            <View style={styles.container}>
                <Text style={styles.title}>Paramètres</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: WBColors.WBBackground
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 0,
        flexWrap: 'wrap',
        color: WBColors.WBText,
        textAlign: 'center'
    }
});

export default SettingsPage