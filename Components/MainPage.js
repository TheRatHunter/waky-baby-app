import React from 'react'
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import WBColors from "../Styles/Colors";

class MainPage extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Accueil',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../Images/notification.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    componentDidMount() {

    }

    alarmProcess() {

    }

    render() {
        return (
            <View>
                <Text>Tout est prêt !</Text>
                <Button
                    onPress={() => this.alarmProcess()}
                    title="Commencer la nuit"
                    color={WBColors.WBPurple}
                />
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

export default MainPage