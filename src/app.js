import React, {Component} from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner, CardSection} from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = {loggedIn: null};

    componentWillMount () {
        firebase.initializeApp({
                apiKey: 'AIzaSyBt61NRhzVobDAazE1C5c8N5QMCsW4PPqs',
                authDomain: 'authentication-b5d96.firebaseapp.com',
                databaseURL: 'https://authentication-b5d96.firebaseio.com',
                projectId: 'authentication-b5d96',
                storageBucket: 'authentication-b5d96.appspot.com',
                messagingSenderId: '806288083133'
            });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({loggedIn: true});
            }
            else{
                this.setState({loggedIn: false});
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn){
            case true:
                return(
                    <CardSection>
                    <Button onPress = {() => firebase.auth().signOut()}>
                        Log Out</Button>
                    </CardSection>
                );
            case false:
                return <LoginForm/>;
            default: <Spinner size = 'large'/>
        }
    }


    render(){
        return(
          <View>
              <Header headerText="Authentication"/>
              {this.renderContent()}
          </View>
        );
    }
}

export default App;