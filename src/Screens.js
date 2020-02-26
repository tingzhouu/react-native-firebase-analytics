import * as React from 'react';
import {Text, View, TextInput} from 'react-native';
import * as Sentry from '@sentry/react-native';
import analytics from '@react-native-firebase/analytics';

import CustomButton from './common/CustomButton';
import styles from './common/styles';
import {AuthContext} from '../App';

export function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details!</Text>
    </View>
  );
}

export function HomeScreen({navigation}) {
  const {state} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <Text>Username: {state.userToken}</Text>
      <CustomButton
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export function BuyScreen({navigation}) {
  const {state} = React.useContext(AuthContext);
  const [quantityToBuy, setQuantityToBuy] = React.useState(0);
  const [quantityBought, setQuantityBought] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text>Buy screen</Text>
      <Text>Username: {state.userToken}</Text>
      <Text>Quantity Bought: {quantityBought}</Text>
      <Text>Quantity To Buy: {quantityToBuy}</Text>
      <CustomButton
        title="Increase Quantity"
        onPress={() => setQuantityToBuy(quantityToBuy + 1)}
      />
      <CustomButton
        title="Decrease Quantity"
        onPress={() =>
          setQuantityToBuy(quantityToBuy === 0 ? 0 : quantityToBuy - 1)
        }
      />
      <CustomButton
        title="Buy"
        onPress={() => {
          setQuantityBought(quantityBought + quantityToBuy);
          setQuantityToBuy(0);
        }}
      />
    </View>
  );
}

export function SettingsScreen({navigation}) {
  const {signOut, state} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      <Text>Username: {state.userToken}</Text>
      <CustomButton
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <CustomButton title="Logout" onPress={signOut} />
    </View>
  );
}

export function CrashScreen({navigation}) {
  const {state} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Crash screen</Text>
      <Text>Username: {state.userToken}</Text>
      <CustomButton title="ReferenceError" onPress={() => asd} />
      <CustomButton title="TypeError" onPress={() => null.asd} />
      <CustomButton
        title="Forever Loop"
        onPress={() => {
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
          function callMe() {
            callMe();
          }
          callMe();
        }}
      />
      <CustomButton
        title="Catch Exception"
        onPress={() => {
          try {
            new Error('Something broke');
          } catch (error) {
            Sentry.captureException(error);
          }
        }}
      />
    </View>
  );
}

export function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState('');

  const {signIn} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Login screen</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.form}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
      {username.length > 0 && (
        <CustomButton title="Login" onPress={() => signIn({username})} />
      )}
    </View>
  );
}

export function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Splash screen</Text>
    </View>
  );
}
