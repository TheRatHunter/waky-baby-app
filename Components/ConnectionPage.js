import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import WBColors from "../Styles/Colors";

class ConnectionPage extends React.Component {

    componentDidMount() {

    }

    _goToNext = () => {
        this.props.navigation.navigate("MainNavigation")
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Connect to your WakyBaby Device !</Text>
                <Button
                    onPress={() => this._goToNext()}
                    title="Suivant"
                    color={WBColors.WBPurple}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 0,
        flexWrap: 'wrap',
        color: WBColors.WBPurple,
        textAlign: 'center'
    }
});

export default ConnectionPage