import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomButton from './common/CustomButton';
import styles from './common/styles';

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
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      <CustomButton
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Login screen</Text>
      <CustomButton
        title="Login"
        onPress={() => navigation.navigate('Details')}
      />
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
