import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import * as Screens from './src/Screens';
import * as auth from './src/authReducer';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://be7ae5d35f854e06bfe6a67dca3b6236@sentry.io/2596649',
});

export const AuthContext = React.createContext();

const Stack = createStackNavigator();

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Screens.HomeScreen} />
      <HomeStack.Screen name="Details" component={Screens.DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Screens.SettingsScreen}
      />
      <SettingsStack.Screen name="Details" component={Screens.DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const CrashStack = createStackNavigator();
function CrashStackScreen() {
  return (
    <CrashStack.Navigator>
      <CrashStack.Screen
        name="Crash This App"
        component={Screens.CrashScreen}
      />
    </CrashStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Crash" component={CrashStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [state, dispatch] = React.useReducer(auth.reducer, auth.initialState);
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      console.log('userToken', userToken);
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SIGN_IN', token: data.username});
        AsyncStorage.setItem('userToken', data.username);
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );

  if (state.isLoading) {
    return <Screens.SplashScreen />;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen name="Login" component={Screens.LoginScreen} />
          ) : (
            <Stack.Screen name="Main" component={MainTabs} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
