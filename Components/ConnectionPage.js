import React from 'react'
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  PermissionsAndroid,
  TouchableHighlight,
  NativeModules,
  NativeEventEmitter,
  ListView,
  ScrollView,
  } from 'react-native';
import WBColors from "../Styles/Colors";
import BleManager from "react-native-ble-manager"
import { connect } from 'react-redux'





//Ecoute des events
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
// Pour la construction de la liste
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});



class ConnectionPage extends React.Component {
  constructor(){
    super()
    this.state = {
      scanning : false,
      scanned : false,
      babyIsSleeping : 1,
      peripherals: new Map()
    }

    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
  }

    static navigationOptions = {
        headerStyle: {backgroundColor: WBColors.WBBar},
        title: 'Connection Bluetooth',
        headerTintColor: 'white'
    };

    componentDidMount() {

      // Demande d'autorisation d'utilisation de la position
      // Car l'utilisation du BLE permettrait de localiser le device
      if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
              if (result) {
                console.log("Permission is OK");
              } else {
                Alert.alert(
                'Concernant l\'utilisation de la position',
                'L\'application nécessite l\'accès à la position. En effet le BLE est considéré comme pouvant permettre la localisation du téléphone. Vous n\'avez pas besoin d\'utiliser le GPS',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                  if (result) {
                    console.log("User accept");
                  } else {
                    console.log("User refuse");
                  }
                });
              }
        });
      }
      // Lancement du BLE manager
      BleManager.start({showAlert: false})
      .then(() => {
        //Success
      });


      // Listener

      this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
      this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
      this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
      this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
    }

    componentWillUnmount(){
      this.handlerStop.remove();
      this.handlerDiscover.remove();
      this.handlerDisconnect.remove();
      this.handlerUpdate.remove();
    }


    _goToNext = () => {
        this.props.navigation.navigate("MainNavigation")
    };


    _startBluetoothScanning(){
      BleManager.enableBluetooth()
      .then(() => {
        // Success code
        if (!this.state.scanning) {
          this.setState({peripherals: new Map()});
          BleManager.scan([], 3, true).then((results) => {
            this.setState({
              scanning:true,
              scanned : true
            });

          });
        }

      })
      .catch((error) => {
        // Failure code
      });
    }

    // Event Handler
    handleStopScan() {
      this.setState({ scanning: false });
    }

    handleDiscoverPeripheral(peripheral){
      var peripherals = this.state.peripherals;
      if (!peripherals.has(peripheral.id)){
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals })
      }
    }

    handleDisconnectedPeripheral(data) {
      let peripherals = this.state.peripherals;
      let peripheral = peripherals.get(data.peripheral);
      if (peripheral) {
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);
        this.setState({peripherals});
      }
    }

    handleUpdateValueForCharacteristic(data) {
      data.value[0] ? this.setState({babyIsSleeping : false}) : this.setState({babyIsSleeping : true})
      const action = {type : "STORE_VALUE", value : this.state.babyIsSleeping}

      this.props.dispatch(action)
      console.log(this.state.babyIsSleeping);
      //console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }



    // Fonction de connection au device :
    connectAndSubscribe(peripheral) {
      if (peripheral){
        if (peripheral.connected){
          BleManager.disconnect(peripheral.id)
            .then(() => {
              // Success code
              })
              .catch((error) => {
              // Failure code
              console.log(error);
              });
        }else{
          BleManager.connect(peripheral.id)
            .then(() => {
                // Success code
                let peripherals = this.state.peripherals;
                let p = peripherals.get(peripheral.id);
                if (p) {
                  p.connected = true;
                  peripherals.set(peripheral.id, p);
                  this.setState({peripherals});
                }
                BleManager.retrieveServices(peripheral.id)
                  .then((peripheralInfo) => {
                    // Success code
                    var service = '19B10000-E8F2-537E-4F6C-D104768A1214';
                    var switcCharac = '19B10001-E8F2-537E-4F6C-D104768A1214';


                    BleManager.startNotification(peripheral.id, service, switcCharac)
                    .then(() => {
                      // Success code
                    })
                    .catch((error) => {
                      // Failure code
                      console.log(error);
                      Alert.alert(
                        'Mauvais Device',
                        'Ce n\'est pas le Waky Device ! Déconnectez-vous puis connectez vous au device Waky Baby ! (Déconnection auto en cas de mauvais peut être impémenté plus tard)',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                      )
                    });
                  });
                })
            .catch((error) => {
                // Failure code
            console.log(error);
          });
        }
      }
    }







    render() {

      //Remplissage de la liste de peripheral
      const list = Array.from(this.state.peripherals.values());
      const dataSource = ds.cloneWithRows(list);


        return (
            <View style={styles.container}>
                <Text style={styles.title}>Connectez vous à votre Waky Baby !</Text>
                <TouchableHighlight style={styles.scanButton} onPress={() => this._startBluetoothScanning() }>
                  <Text style={{color: WBColors.WBText}}>Trouver votre Waky Baby  ({this.state.scanning ? 'on' : 'off'})</Text>
                </TouchableHighlight>
                <ScrollView style={styles.scroll}>
                  {(list.length == 0) &&
                    <View style={{flex:1, margin: 20}}>
                      <Text style={styles.texte}>Aucun Device Trouvé.</Text>
                      <Text style={styles.texte}>{this.state.scanned ? 'Avez-vous allumé le Waky Device ?' : 'Avez-vous lancé la recherche ?'}</Text>
                    </View>
                  }
                  <ListView
                    enableEmptySections={true}
                    dataSource={dataSource}
                    renderRow={(item) => {
                      const color = item.connected ? 'purple' : '#fff';
                      return (
                        <TouchableHighlight onPress={() => this.connectAndSubscribe(item) }>
                          <View style={[styles.row, {backgroundColor: color}]}>
                            <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                            <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
                          </View>
                        </TouchableHighlight>
                      );
                    }}
                  />
                </ScrollView>

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
        textAlign: 'center'
    },
    scanButton:{
      marginTop: 40,
      margin: 20,
      padding:20,
      backgroundColor: WBColors.WBBar
    },
    texte:{
      color: WBColors.WBText,
      textAlign: 'center'
    }
});

const mapDispatchToProps = (dispatch) => {
  return{
    dispatch: (action) => {dispatch(action)}
  }
}

export default connect( mapDispatchToProps)(ConnectionPage)
