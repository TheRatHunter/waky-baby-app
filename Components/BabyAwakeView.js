import React from 'react'
import {View, Text, StyleSheet, Button, Platform} from 'react-native';
import WBColors from "../Styles/Colors";
import Torch from "react-native-torch/index.android";

class BabyAwakeView extends React.Component {

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async flash() {
        // Launch a sequence of three brief flashes
        for (let i=0; i<3; i++) {
            console.log("Turning the torch on...");
            Torch.switchState(true);
            await this.timeout(500);
            console.log("...then off !");
            Torch.switchState(false);
            await this.timeout(500);
        }
        return null;
    }

    async launchAlarm() {
        await this.flash();
    }

    async componentDidMount() {
        // Not yet implemented for iOS
        if (Platform.OS === 'android') {
            this.cameraAllowed = await Torch.requestCameraPermission(
                'Camera Permissions', // dialog title
                'We require camera permissions to use the torch on the back of your phone.' // dialog body
            );
        }

        this.launchAlarm();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bébé est réveillé !!!</Text>
                <Button
                    onPress={() => this.props.turnOffAlarm()}
                    title="OK"
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

export default BabyAwakeView