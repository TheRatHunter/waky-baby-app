import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import WBColors from "../Styles/Colors";

class WelcomePage extends React.Component {

    componentDidMount() {

    }

    _goToNext = () => {
        this.props.navigation.navigate("ConnectionPage")
    };

    render() {
        return (
            <View>
                <Text>Welcome !</Text>
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

export default WelcomePage