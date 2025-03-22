import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const Withdraw = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const apiUrl = 'https://tr.recoveryitltd.com/api/balance';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error fetching data. Check internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (amount.trim() === '' || number.trim() === '' || selectedPaymentMethod.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Amount, Mobile Number fields are mandatory.',
        text2: 'Payment method fields is mandatory. Try again..👋'
      });
      return;
    }

    try {
      // Payload
      const payload = {
        phone_number: number,
        amount: amount,
        payment_method: selectedPaymentMethod
      };

      // POST request
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch('https://tr.recoveryitltd.com/api/withdraw', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        sslPinning: { certs: ['mycert'] },
      });

      const data = await response.json();

      if (data.status === 'success') {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: t('Withdraw Successfully !'),
          text2: t('Your withdraw has been successfully submitted !')
        });
        navigation.navigate('DashboardTabs');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: t('Withdraw Unsuccessful !'),
          text2: t('Unable to withdraw deposit !'),
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      
      const parsedBody = JSON.parse(error.bodyString.trim());
      const errorMessage = parsedBody.error;

      Toast.show({
        type: 'error',
        text1: 'Withdraw Unsuccessfull.',
        text2: errorMessage
      });
    }
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          নোটিশ: মিনিমাম উইথড্র ৫০০ টাকা। উইথড্র দেয়ার সাথে সাথে অটোম্যাটিকভাবে পেমেন্ট পেয়ে যাবেন
        </Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{t('Balance')} : ৳ {i18n.language == 'en' ? data?.balance : toBn(data?.balance)}</Text>
      </View>

      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'Nogod' && styles.selectedPaymentMethod]}
          onPress={() => handlePaymentMethodSelect('Nogod')}
        >
          <Image source={require('../nogodLogo.png')} style={styles.paymentLogo} resizeMode="contain" />
          <Text style={styles.paymentMethodText}>{t('Nogod')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'Rocket' && styles.selectedPaymentMethod]}
          onPress={() => handlePaymentMethodSelect('Rocket')}
        >
          <Image source={require('../rocketLogo.png')} style={styles.paymentLogo} resizeMode="contain" />
          <Text style={styles.paymentMethodText}>{t('Rocket')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'Bkash' && styles.selectedPaymentMethod]}
          onPress={() => handlePaymentMethodSelect('Bkash')}
        >
          <Image source={require('../bkashLogo.png')} style={styles.paymentLogo} resizeMode="contain" />
          <Text style={styles.paymentMethodText}>{t('Bkash')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Mobile Number')} * :</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Mobile Number')}
          value={number}
          onChangeText={setNumber}
        />
        <Text style={styles.label}>{t('Amount')} * :</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Amount')}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Text style={styles.minDepositText}>{t('Minimum withdraw 500 BDT')}</Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
        <Text style={styles.submitButtonText}>{t('Submit')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginBottom: 20,
  },
  paymentLogo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  balanceContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#0E9C7E",
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethod: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '30%',
    alignItems: 'center',
  },
  selectedPaymentMethod: {
    borderColor: 'blue',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  minDepositText: {
    color: 'red',
  },
  submitButton: {
    backgroundColor: '#0E9C7E',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default Withdraw;
