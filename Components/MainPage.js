import React from 'react'
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import WBColors from "../Styles/Colors";
import AlarmOffView from "./AlarmOffView"
import BabyAwakeView from "./BabyAwakeView";
import BabySleepingView from "./BabySleepingView"



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

    constructor(props) {
        super(props);
        this.state = {
            isAlarmOn: false,
            isBabySleeping: true,

        };
        this.turnOnAlarm = this.turnOnAlarm.bind(this);
        this.turnOffAlarm = this.turnOffAlarm.bind(this);
        this.babyAwake = this.babyAwake.bind(this);

    }

    componentDidMount() {

    }

    turnOnAlarm() {
        console.log("Turning on Alarm");
        this.setState(
            {
                isAlarmOn: true,
                isBabySleeping: true
            }
        )
    }

    turnOffAlarm() {
        console.log("Turning off alarm");
        this.setState(
            {
                isAlarmOn: false,
                isBabySleeping: true
            }
        )
    }

    babyAwake() {
        console.log("Baby awake");
        this.setState(
            {
                isAlarmOn: true,
                isBabySleeping: false
            }
        )
    }

    renderChildren() {
        if (!this.state.isAlarmOn) {
            return <AlarmOffView turnOnAlarm={this.turnOnAlarm}/>;
        } else if (this.state.isAlarmOn && this.state.isBabySleeping) {
            return <BabySleepingView turnOffAlarm={this.turnOffAlarm} babyAwake={this.babyAwake}/>;
        } else {
            return <BabyAwakeView turnOffAlarm={this.turnOffAlarm}/>;
        }
    }

    render() {
        return (
            <View  style={styles.container}>
                { this.renderChildren() }
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

export default MainPage
