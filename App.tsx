import React from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

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
import LanguageToggle from './lang/LanguageToggle';
import NoticeBoard from './components/NoticeBoard';
import ChangePassword from './components/ChangePassword';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LogoutButton = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLogout = async (navigation: any) => {
    try {
      // Remove from session
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('accessName');
      await AsyncStorage.removeItem('accessUserName');
      await AsyncStorage.removeItem('accessPhone');
      
      Toast.show({
        type: 'success',
        position: 'top',
        text1: t('Logged out successfully !'),
        text2: t('You have been logged out of the app.'),
        visibilityTime: 3000,
        autoHide: true,
      });

      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: t('Logout Failed!'),
        text2: t('An error occurred while logging out. Please try again.'),
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };


  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => handleLogout(navigation)}
    >
      <Image
        source={require('./logout-icon.png')}
        style={styles.logoutIcon}
      />
      <Text style={styles.logoutText}>{t('Logout')}</Text>
    </TouchableOpacity>
  );
};

const DashboardTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarStyle: {
          backgroundColor: '#ffff',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name={t('Dashboard')}
        component={Dashboard}
        options={{
          headerStyle: { backgroundColor: '#ffff' },
          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <LanguageToggle />
            </View>
          ),
          tabBarIcon: () => (
            <Image
              source={require('./home-icon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t('Logout')}
        component={() => null}
        options={{
          tabBarButton: () => <LogoutButton />,
          tabBarLabel: () => null,
          tabBarIcon: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

function App(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashboardTabs"
            component={DashboardTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={t('Deposit')}
            component={Deposit}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={t('Withdraw')}
            component={Withdraw}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={t('Package')}
            component={Package}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={t('Transaction')}
            component={Transaction}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={t("Daily Work")}
            component={Dailywork}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={t('Profile')}
            component={Profile}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={t('Refer')}
            component={Refer}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={t('Helpline')}
            component={HelpLine}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={t('Notice Board')}
            component={NoticeBoard}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginBottom: 3,
  },
  logoutText: {
    color: 'red',
    fontSize: 10,
  },
});

export default App;
