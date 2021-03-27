import React, { Component}from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config";
import { RFValue } from "react-native-responsive-fontsize";
import {SafeAreaProvider} from 'react-native-safe-area-context';
export default class SettingsScreen extends Component{
    constructor (){
        super();
        this.state = {
            emailId: '',
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            docId: '',
        }
    }
    getUserDetails = () => {
        var email = firebase.auth().currentUser.email
        db.collection('users').where('email_id','==', email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data();
                this.setState({
                    emailId: data.email_id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    contact: data.contact,
                    address: data.address,
                    docId: doc.id
                })
            })
        })
    }
    updateUserdetail = () => {
        db.collection('users').doc(this.state.docId).update({
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "contact": this.state.contact,
            "address": this.state.address,
        })
        Alert.alert("Profile updated successfully.")
    }
    componentDidMount() {
        this.getUserDetails();
    }
    render() {
        return(
            <SafeAreaProvider>
            <View style={styles.container}>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <View style={styles.formContainer}>
                    <Text style={styles.lable}>First Name</Text>
                    <TextInput 
                        style={styles.formtextinput} 
                        placeholder={"First Name"}
                        maxLength={8}
                        onchangeText={(text)=>{
                            this.setState({firstName:text})
                        }}
                        value={this.state.firstName}
                    />
                    <Text style={styles.lable}>Last Name</Text>
                     <TextInput 
                        style={styles.formtextinput} 
                        placeholder={"Last Name"}
                        maxLength={8}
                        onchangeText={(text)=>{
                            this.setState({lastName:text})
                        }}
                        value={this.state.lastName}
                    />
                     <Text style={styles.lable}>Contact</Text>
                     <TextInput 
                        style={styles.formtextinput} 
                        placeholder={"Contact "}
                        maxLength={10}
                        keyboardType={"numeric"}
                        onchangeText={(text)=>{
                            this.setState({Contact:text})
                        }}
                        value={this.state.contact}
                    />
                     <Text style={styles.lable}>Address</Text>
                     <TextInput 
                        style={styles.formtextinput} 
                        placeholder={"Address"}
                        multiline={true}
                        onchangeText={(text)=>{
                            this.setState({address:text})
                        }}
                        value={this.state.address}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.updateUserdetail}>
                        <Text style={styles.buttontext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaProvider>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    lable:{
        fontSize: RFValue(10),
        color: '#717e7e',
        fontWeight: 'bold',
        padding: RFValue(10),
        margin: RFValue(30),
    },
    formtextinput: {
        width: '75%',
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop:RFValue(20),
        padding:RFValue(10),
    },
    buttontext:{
        fontSize:25,
        fontWeight:'bold',
        color: 'white',
    },
    button:{
        width: '75%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        backgroundColor:'#ff5722',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height:8
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20,
    }
})