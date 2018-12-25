import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native';

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

    render() {
        return (
            <View>
                <Text>aaa</Text>
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