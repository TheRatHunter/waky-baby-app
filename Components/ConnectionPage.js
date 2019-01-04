import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import WBColors from "../Styles/Colors";

class ConnectionPage extends React.Component {

    static navigationOptions = {
        headerStyle: {backgroundColor: WBColors.WBBar},
        title: 'Connection Bluetooth',
        headerTintColor: 'white'
    };

    componentDidMount() {

    }

    _goToNext = () => {
        this.props.navigation.navigate("MainNavigation")
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Connectez vous à votre Waky Baby !</Text>
                <Button
                    onPress={() => this._goToNext()}
                    title="Suivant"
                    color={WBColors.WBBar}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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

export default ConnectionPage