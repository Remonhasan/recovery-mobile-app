import { fetch } from 'react-native-ssl-pinning';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      // Alert.alert('Error', 'Email and Password fields are mandatory.');
      Toast.show({
        type: 'error',
        text1: 'Email and Password fields are mandatory.',
        text2: 'Please try again.. 👋'
      });
      return;
    }

    setIsLoading(true);

    const payLoad = {
      username: email,
      password,
    };
    try {
      const response = await fetch('https://tr.recoveryitltd.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
        sslPinning: {
          certs: ['mycert'],
        },
      });

      const data = await response.json();
  
      if (data.success === true) { // check your json response
        setIsLoading(false);

        const accessToken = data?.data.token;
        const accessName = data?.data.name;
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('accessName', accessName);
        Toast.show({
          type: 'success',
          text1: 'Login Successfull.',
          text2: 'Welcome to Dashboard 👋'
        });
        navigation.navigate('DashboardTabs');
      } else {
        setIsLoading(false);
        Alert.alert('Error', 'Invalid Credentials.' || 'Login failed.');
      }
    } catch (error) {
      setIsLoading(false);
      console.log("login error:", error)
      Alert.alert('Error', 'Check internet connection and valid credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../org-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>USERNAME *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder='your username'
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PASSWORD *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder='your password'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Not registered yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.createAccountText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  orgLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  orgLogo: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 25,
  },
  beforeSubtitle: {
    fontSize: 20,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 5,
  },
  orgTitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#334155',
  },
  button: {
    height: 50,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#475569',
  },
  createAccountText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginScreen;
