import React from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import WBColors from "../Styles/Colors";

class WelcomePage extends React.Component {

    static navigationOptions = {
        headerStyle: {backgroundColor: WBColors.WBBar},
        title: 'Bienvenue !',
        headerTintColor: 'white'
    };

    componentDidMount() {

    }

    _goToNext = () => {
        this.props.navigation.navigate("ConnectionPage")
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenue sur votre application WakyBaby !</Text>
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
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10
    }
});

export default WelcomePage