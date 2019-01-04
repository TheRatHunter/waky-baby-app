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
            <View>
                <Text>Connect to your WakyBaby Device !</Text>
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

});

export default ConnectionPage