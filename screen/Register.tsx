import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (name.trim() === '' || username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      // Alert.alert('Error', 'Username, Password, Confirm Password fields are mandatory.');
      Toast.show({
        type: 'error',
        text1: 'Name and Username fields are mandatory.',
        text2: 'Password and Confirm Password fields are mandatory.👋'
      });
      return;
    }

    setIsLoading(true);

    const payLoad = {
      name: name,
      phone: mobile,
      username: username,
      password: password,
      password_confirmation: confirmPassword
    };
    try {
      const response = await fetch('https://tr.recoveryitltd.com/api/registration', {
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
      console.log("Data", data)
      if (data.status === 'success') {
        setIsLoading(false);

        Toast.show({
          type: 'success',
          text1: 'Registration Successfull.',
          text2: 'Please Login and Enjoy your experience.. 👋'
        });
        navigation.navigate('Login');
      } else {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Registration Unsuccessfull.',
          text2: 'Try Again...'
        });
      }
    } catch (error) {
      setIsLoading(false);

      const parsedBody = JSON.parse(error.bodyString.trim());
      const errorMessage = parsedBody.message;

      Toast.show({
        type: 'error',
        text1: 'Registration Unsuccessfull.',
        text2: errorMessage
      });

    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../org-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Register</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>NAME *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      {/* Mobile Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>MOBILE</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>USERNAME *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Choose a username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PASSWORD *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>CONFIRM PASSWORD *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} disabled={isLoading} onPress={handleRegister}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>REGISTER</Text>
        )}
      </TouchableOpacity>

      {/* Already have an account? Link */}
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkTextBold}>Login here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Adjust the content alignment
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 20,
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
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#475569',
  },
  linkTextBold: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Register;
