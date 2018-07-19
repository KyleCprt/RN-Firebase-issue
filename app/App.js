import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NetInfo,
  StatusBar,
  Platform,
  BackHandler
} from 'react-native';
// #REDUX
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { connectionState, fbGetToken, appStart, goBack } from '@actions';
import RNFirebase from 'react-native-firebase';
import '../ReactotronConfig';
import Reactotron from 'reactotron-react-native';

// #ROUTER FLUX
import {
  Actions,
  Router,
  Scene,
  Stack,
  Lightbox
} from 'react-native-router-flux';

// #APP
import AsyncDispatcMiddleware from '@middleware';
// #SCENES
import Login from '@scenes/LoginScene';

// #COMPONENTS
import Spinner from '@components/Spinner';

// #Providers
import FirebaseProvider from '@providers/FirebaseProvider';

// FCM
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from 'react-native-fcm';

const navigator = Actions.create(
  <Lightbox transparent>
    <Stack key="root" hideTabBar hideNavBar>
      <Stack hideTabBar hideNavBar>
        <Scene key="login" initial={true} component={Login} />
      </Stack>
    </Stack>
  </Lightbox>
);

const ReduxRouter = connect()(Router);
const AppReducers = require('@reducers').default;
let store;

if (__DEV__) {
  store = Reactotron.createStore(
    AppReducers,
    applyMiddleware(AsyncDispatcMiddleware)
  );
} else {
  store = createStore(AppReducers, applyMiddleware(AsyncDispatcMiddleware));
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false
    };
    store.subscribe(this._onStoreChanged.bind(this));
    FirebaseProvider.init(store);
    RNFirebase.app()
      .perf()
      .setPerformanceCollectionEnabled(true);
    store.dispatch(appStart());
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectionChange
    );

    FCM.requestPermissions();

    FCM.getFCMToken().then((token) => {
      // store the fcm token
      store.dispatch(fbGetToken(token));
    });

    FCM.on(FCMEvent.RefreshToken, (token) => {
      // fcm token may not be available on first load, catch it here
      store.dispatch(fbGetToken(token));
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      //this.displayAlert(notif);

      if (Platform.OS === 'ios') {
        // optional
        // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
        // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on 'show_in_foreground'). However if you want to return different result, follow the following code to override
        // notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData); // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All); // other types available: WillPresentNotificationResult.None
            break;
          default:
            break;
        }
      }
    });

    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
    FCM.getInitialNotification().then((notif) => {
      if (Platform.OS === 'android') {
        //this.displayAlert(notif);
      }
    });

    BackHandler.addEventListener('hardwareBackPress', () => {
      const { isBackButtonPresent, showSpinner } = store.getState().appContent;
      if (showSpinner) {
        return true;
      } else if (isBackButtonPresent) {
        // Go back to the previous scene
        store.dispatch(goBack());
        return true;
      } else {
        return true;
      }
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectionChange
    );

    // stop listening for events
    this.notificationListener.remove();

    BackHandler.removeEventListener('hardwareBackPress');
  }

  _handleConnectionChange = (isConnected) => {
    store.dispatch(connectionState(isConnected));
  };

  _onStoreChanged() {
    const _rdxState = store.getState();
    if (_rdxState.appContent.showSpinner !== this.state.showSpinner) {
      this.setState({ showSpinner: _rdxState.appContent.showSpinner });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <ReduxRouter navigator={navigator} />
          {this.state.showSpinner && <Spinner />}
          {__DEV__ && (
            <Text style={localStyles.version}>
              {require('./VERSION').VERSION}
            </Text>
          )}
        </View>
      </Provider>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  version: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'orangered',
    fontSize: 10,
    backgroundColor: 'transparent'
  }
});
