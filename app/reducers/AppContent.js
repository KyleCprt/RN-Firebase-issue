import { NativeModules, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FirebaseProvider from '@providers/FirebaseProvider';


const AppContent = (state, action) => {
  if (!state) {
    let _locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;
    _locale = _locale.substring(0, 2);

    return {
      locale: _locale,
      isAuthSequence: true,
      login: '',
      password: '',
      spinnerMsg: '',
      showSpinner: false
    };
  }

  switch (action.type) {
    // APP START
    case 'APP_START': {
      //FirebaseProvider.grabSites();

      return {
        ...state
      };
    }

    // //////////////////////////
    // NAVIGATION
    // //////////////////////////
    case 'GO_TO': {
      if (action.scene !== state.currentScene) {
        if (action.scene) {
          Promise.resolve()
            .then(() => Actions[action.scene].call());
        }
      }

      return {
        ...state
      };
    }

    case 'GO_BACK': {
      Promise.resolve()
        .then(() => Actions.pop());

      return {
        ...state
      };
    }

    case 'SHOW_MODAL': {
      Promise.resolve().then(() => Actions[action.scene].call());

      return {
        ...state,
        modalProps: { ...action.props }
      };
    }

    default:
      return state;
  }
};

export default AppContent;
