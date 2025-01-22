import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Login from './screen/Login';
import Register from './screen/Register';
import Dashboard from './screen/Dashboard';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Package from './components/Package';
import Dailywork from './components/Dailywork';
import Transaction from './components/Transaction';
import Profile from './components/Profile';
import Refer from './components/Refer';
import HelpLine from './components/HelpLine';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Login'}>
            {/* Login Screen */}
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerLeft: null,
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ 
                headerLeft: null,
                headerShown: true 
              }}
            />
            <Stack.Screen
              name="Deposit"
              component={Deposit}
              options={{ 
                headerShown: true 
              }}
            />
            <Stack.Screen
              name="Withdraw"
              component={Withdraw}
              options={{ 
                headerShown: true 
              }}
            />
            <Stack.Screen
              name="Package"
              component={Package}
              options={{ 
                headerShown: true 
              }}
            />
            <Stack.Screen
              name="Transaction"
              component={Transaction}
              options={{ 
                headerShown: true 
              }}
            />
             <Stack.Screen
              name="Daily Work"
              component={Dailywork}
              options={{ 
                headerShown: true 
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ 
                headerShown: true 
              }}
            />
             <Stack.Screen
              name="Refer"
              component={Refer}
              options={{ 
                headerShown: true 
              }}
            />
            <Stack.Screen
              name="Helpline"
              component={HelpLine}
              options={{ 
                headerShown: true 
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
