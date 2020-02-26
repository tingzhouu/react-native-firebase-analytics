/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/analytics';

if (firebase.app().utils().isRunningInTestLab) {
  firebase.analytics().setAnalyticsCollectionEnabled(false);
}

AppRegistry.registerComponent(appName, () => App);
