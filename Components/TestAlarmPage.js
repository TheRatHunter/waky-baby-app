import React from 'react'
import {View, Image, StyleSheet, Button} from 'react-native';

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

    componentDidMount() {

    }

    testLight() {
        console.log("Yo");
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