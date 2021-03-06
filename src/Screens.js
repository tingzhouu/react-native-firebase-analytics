import * as React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import * as Sentry from '@sentry/react-native';
import * as analytics from './common/analytics';
import OneSignal from 'react-native-onesignal';

import CustomButton from './common/CustomButton';
import styles from './common/styles';
import {AuthContext} from '../App';
const {home, buy, settings, crash, login} = analytics.events;

export function HomeDetailsScreen() {
  React.useEffect(() => {
    analytics.trackScreenView('HomeDetailsScreen');
  }, []);
  return (
    <View style={styles.container}>
      <Text>Details!</Text>
    </View>
  );
}

export function SettingsDetailsScreen() {
  React.useEffect(() => {
    analytics.trackScreenView('SettingsDetailsScreen');
  }, []);
  return (
    <View style={styles.container}>
      <Text>Details!</Text>
    </View>
  );
}

export function HomeScreen({navigation}) {
  const {state} = React.useContext(AuthContext);
  React.useEffect(() => {
    analytics.trackScreenView('HomeScreen');
  }, []);

  return (
    <View style={styles.container}>
      <Text testID="HomeTitle">Home screen</Text>
      <Text>Username: {state.userToken}</Text>
      <Text>App Version: {state.appVersion}</Text>
      <CustomButton
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details');
          analytics.trackUserEvent(home.details);
        }}
      />
    </View>
  );
}

export function BuyScreen({navigation}) {
  const {state} = React.useContext(AuthContext);
  const [quantityToBuy, setQuantityToBuy] = React.useState(0);
  const [quantityBought, setQuantityBought] = React.useState(0);
  React.useEffect(() => {
    analytics.trackScreenView('BuyScreen');
  }, []);
  return (
    <View style={styles.container}>
      <Text>Buy screen</Text>
      <Text>Username: {state.userToken}</Text>
      <Text>App Version: {state.appVersion}</Text>
      <Text>Quantity Bought: {quantityBought}</Text>
      <Text>Quantity To Buy: {quantityToBuy}</Text>
      <CustomButton
        testID="IncreaseQuantityButton"
        title="Increase Quantity"
        onPress={() => {
          setQuantityToBuy(quantityToBuy + 1);
          analytics.trackUserEvent(buy.increase);
        }}
      />
      <CustomButton
        testID="DecreaseQuantityButton"
        title="Decrease Quantity"
        onPress={() => {
          setQuantityToBuy(quantityToBuy === 0 ? 0 : quantityToBuy - 1);
          analytics.trackUserEvent(buy.decrease);
        }}
      />
      <CustomButton
        testID="BuyButton"
        title="Buy"
        onPress={() => {
          setQuantityBought(quantityBought + quantityToBuy);
          setQuantityToBuy(0);
          analytics.trackUserEvent(buy.buy);
        }}
      />
    </View>
  );
}

export function SettingsScreen({navigation}) {
  const {signOut, state} = React.useContext(AuthContext);
  React.useEffect(() => {
    analytics.trackScreenView('SettingsScreen');
  }, []);
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      <Text>Username: {state.userToken}</Text>
      <Text>App Version: {state.appVersion}</Text>
      <CustomButton
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details');
          analytics.trackUserEvent(settings.details);
        }}
      />
      <CustomButton
        title="Logout"
        testID="LogoutButton"
        onPress={async () => {
          await analytics.trackUserEvent(settings.logout);
          signOut();
        }}
      />
    </View>
  );
}

export function CrashScreen({navigation}) {
  const {state} = React.useContext(AuthContext);
  React.useEffect(() => {
    analytics.trackScreenView('CrashScreen');
  }, []);
  return (
    <View style={styles.container}>
      <Text>Crash screen</Text>
      <Text>Username: {state.userToken}</Text>
      <Text>App Version: {state.appVersion}</Text>
      <CustomButton
        title="ReferenceError"
        onPress={() => {
          analytics.trackUserEvent(crash.refErr);
          asd;
        }}
      />
      <CustomButton
        title="TypeError"
        onPress={() => {
          analytics.trackUserEvent(crash.typeErr);
          null.asd;
        }}
      />
      <CustomButton
        title="Forever Loop"
        onPress={() => {
          analytics.trackUserEvent(crash.infiniteErr);
          let a = 999;
          let arr = [];
          while (true) {
            console.log('WOOHOOO');
            a = a * a * a;
            arr.push(a);
            console.log('arr', arr);
          }
        }}
      />
      <CustomButton
        title="Stack Overflow"
        onPress={() => {
          analytics.trackUserEvent(crash.callStackErr);
          function callMe() {
            callMe();
          }
          callMe();
        }}
      />
      <CustomButton
        title="Catch Exception"
        onPress={() => {
          analytics.trackUserEvent(crash.catchException);
          try {
            throw new Error('Something broke! Save me please :(');
          } catch (error) {
            console.log('error', error.message);
            Sentry.captureException(error);
          }
        }}
      />
    </View>
  );
}

function checkNotification() {
  // Check push notification and OneSignal subscription statuses
  OneSignal.getPermissionSubscriptionState((status) => {
    console.log('status', status);
  });
}

function requestNotification() {
  const permissions = {
    alert: true,
    badge: true,
    sound: true,
  };
  OneSignal.requestPermissions(permissions);
  // OneSignal.registerForPushNotifications();
}

function startNotifications() {
  OneSignal.setSubscription(true);
}

function stopNotifications() {
  OneSignal.setSubscription(false);
}

function onReceived(notification) {
  console.log("Notification received: ", notification);
}

function onOpened(openResult) {
  console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
}

function onIds(device) {
  console.log('Device info: ', device);
}

export function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  React.useEffect(() => {
    analytics.trackScreenView('LoginScreen');
  }, []);

  const {signIn} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Login screen</Text>
      <View>
        <TouchableOpacity testID="MyUniqueId123" onPress={checkNotification}>
          <Text>Press for ONESignal Notif Details</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity testID="MyUniqueId123" onPress={requestNotification}>
          <Text>Press for ONESignal request notif permissions</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity testID="MyUniqueId123" onPress={startNotifications}>
          <Text>Start notifications</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity testID="MyUniqueId123" onPress={stopNotifications}>
          <Text>Stop notifications</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        testID="UsernameInput"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.form}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
      {username.length > 0 && (
        <CustomButton
          title="Login"
          testID="LoginButton"
          onPress={() => {
            analytics.trackUserEvent(login.login);
            signIn({username});
          }}
        />
      )}
    </View>
  );
}

export function SplashScreen({navigation}) {
  React.useEffect(() => {
    analytics.trackScreenView('SplashScreen');
  }, []);
  return (
    <View style={styles.container}>
      <Text>Splash screen</Text>
    </View>
  );
}
