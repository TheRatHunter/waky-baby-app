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
            console.log("Opening drawer...");
            this.props.navigation.openDrawer();
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