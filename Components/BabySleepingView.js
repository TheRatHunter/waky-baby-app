import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import WBColors from "../Styles/Colors";

class BabySleepingView extends React.Component {



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bébé dort bien !</Text>
                <Button
                    onPress={() => this.props.turnOffAlarm()}
                    title="Arrêter la nuit"
                    color={WBColors.WBBar}
                />
                <Button
                    onPress={() => this.props.babyAwake()}
                    title="Réveiller bébé (temporaire)"
                    color={WBColors.WBBar}
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

export default BabySleepingView