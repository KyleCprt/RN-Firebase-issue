import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SplashScreen from 'react-native-splash-screen';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform
} from 'react-native';
import CustomStatusBar from '@components/CustomStatusBar';
import FirebaseProvider from '@providers/FirebaseProvider';

class LoginScene extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require('@images/LoginScene/login-scene-background.png')}
      >
        <View
          style={{
            backgroundColor: '#212121',
            ...StyleSheet.absoluteFillObject,
            opacity: 0.75
          }}
        />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[localStyles.container]}
          bounces={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={localStyles.mainView}>
            <CustomStatusBar />
            <View style={localStyles.connectionView}>
              <TouchableOpacity
                style={[localStyles.button, localStyles.buttonMicrosoft]}
                onPress={() => FirebaseProvider.checkIfUserExists('123-456')}
              >
                <Text style={localStyles.labelButton}>
                  Test RN Firebase Functions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 50
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 80
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  logoMicrosoft: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10
  },
  headerTitle: {
    paddingLeft: 10,
    marginBottom: Platform.OS === 'ios' ? -10 : -5,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 30,
    textAlignVertical: 'center',
    includeFontPadding: false
  },
  connectionView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 50
  },
  textInput: {
    height: 45,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  button: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1
  },
  buttonMicrosoft: {
    backgroundColor: 'blue',
    borderWidth: 0
  },
  labelButton: {
    color: 'white',
    fontSize: 17
  },
  passwordForgotContainer: {
    marginTop: 10
  },
  passwordForgotText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic'
  },
  subscribeView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  subscribeHeader: {
    fontSize: 17,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    authError: state.appContent.authError,
    login: state.appContent.login,
    password: state.appContent.password,
  };
}

export default connect(
  mapStateToProps,
  {}
)(LoginScene);
