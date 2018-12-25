import React from 'react'
import {View, Image, StyleSheet, Button} from 'react-native';
import Torch from 'react-native-torch';
import { Platform } from 'react-native';

class TestAlarmPage extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Tester l\'alarme',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../Images/test.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    cameraAllowed=false;
    testing = false;

    async componentDidMount() {
        // Not yet implemented for iOS
        if (Platform.OS === 'android') {
            this.cameraAllowed = await Torch.requestCameraPermission(
                'Camera Permissions', // dialog title
                'We require camera permissions to use the torch on the back of your phone.' // dialog body
            );
        }
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async flash() {
        if (this.cameraAllowed) {
            // Launch a sequence of three brief flashes
            for (let i=0; i<3; i++) {
                console.log("Turning the torch on...");
                Torch.switchState(true);
                await this.timeout(500);
                console.log("...then off !")
                Torch.switchState(false);
                await this.timeout(500);
            }
        } else {
            console.log("Not allowed to use the torch.")
        }
        return null;
    }

    async runTest() {
        await this.flash();
    }


    testLight() {
        if (!this.testing) {
            this.testing = true;
            this.runTest().then( () => { this.testing = false; });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.testLight()}
                    title="Tester le réveil"
                    color="#4C3E54"
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
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default TestAlarmPage