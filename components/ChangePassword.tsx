import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { toBn } from '../utils/util';

const ChangePassword = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (username.trim() === '' || password.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {

      Toast.show({
        type: 'error',
        text1: t('Username, Current Password fields are mandatory.'),
        text2: t('New Password and Confirm New Password fields are mandatory.👋')
      });
      return;
    }

    setIsLoading(true);

    const payLoad = {
      username: username,
      current_password: password,
      new_password: newPassword,
      new_password_confirmation: confirmPassword
    };
   
    try {
      const response = await fetch('https://recoveryitltd.com/api/change-password', {
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
      
      if (data.success === true) {
        setIsLoading(false);

        Toast.show({
          type: 'success',
          text1: t('Password changed successfull.'),
          text2: t('Please Login and Enjoy your experience.. 👋')
        });
        navigation.navigate('Login');
      } else {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: t('Password changed unsuccessfull.'),
          text2: t('Please Try Again.')
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log("changePerr", error)
      const parsedBody = JSON.parse(error.bodyString.trim());
      const errorMessage = parsedBody.message;

      Toast.show({
        type: 'error',
        text1: 'Password changed unsuccessfull.',
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
      <Text style={styles.title}>Change Password</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>USERNAME *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>CURRENT PASSWORD *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your current password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* New Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>NEW PASSWORD *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>CONFIRM NEW PASSWORD *</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} disabled={isLoading} onPress={handleChangePassword}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
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

export default ChangePassword;
