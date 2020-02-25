import * as React from 'react';
import {Text, View, TextInput} from 'react-native';
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
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <CustomButton
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export function SettingsScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      <CustomButton
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <CustomButton title="Logout" onPress={signOut} />
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
