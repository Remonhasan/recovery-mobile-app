import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const Deposit = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState('');
  const [transactionNumber, setTransactionNumber] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
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
    if (amount.trim() === '' || transactionNumber.trim() === '' || selectedPaymentMethod.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Amount, Transaction Number fields are mandatory.',
        text2: 'Payment method fields is mandatory. Try again..👋'
      });
      return;
    }

    try {
      // Payload
      const payload = {
        amount: amount,
        tnx_number: transactionNumber,
        payment_method: selectedPaymentMethod
      };

      // POST request
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch('https://tr.recoveryitltd.com/api/deposit', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        sslPinning: { certs: ['mycert'] },
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Alert.alert('Success', 'Deposit Successfully !');
        Toast.show({
          type: 'success',
          text1: 'Deposit Successfully !',
          text2: 'Enjoy your experience..👋'
        });
        navigation.navigate('DashboardTabs');
      }
    } catch (error) {

      const parsedBody = JSON.parse(error.bodyString.trim());
      const errorMessage = parsedBody.message;

      Toast.show({
        type: 'error',
        text1: 'Deposit Unsuccessfull.',
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
          প্যাকেজ কিনতে প্রথম ডিপোজিট করুন।
        </Text>
        <Text style={styles.headerText}>
          বিকাশ। 01322460060 (পারসোনাল)
        </Text>
        <Text style={styles.headerText}>
          বিকাশ মার্চেন্ট/পেমেন্ট: 01762666121 (পেমেন্টি অপশানে গিয়ে পেমেন্ট)
        </Text>
        <Text style={styles.headerText}>
          নগদ: 01322460060 (পারসোনাল)
        </Text>
        <Text style={styles.headerText}>
          রকেট: 013224600605 (পারসোনাল)
        </Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{t('Balance')} : ৳ {i18n.language == 'en' ? data?.balance : toBn(data?.balance)}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Amount')}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder={t('Enter Transaction Number')}
          value={transactionNumber}
          onChangeText={setTransactionNumber}
        />
        <Text style={styles.minDepositText}>{t('Minimum deposit 500 BDT')}</Text>
      </View>

      <View style={styles.amountOptionsContainer}>
        {[500, 1000, 2000, 3000, 5000, 6000, 9000, 15000, 20000, 25000].map((value) => (
          <TouchableOpacity key={value} style={styles.amountOption} onPress={() => setAmount(value.toString())}>
            <Text style={styles.amountOptionText}>
              {i18n.language === 'en' ? value : toBn(value)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.paymentText}>{t('Select Payment Method')}</Text>
      </View>
      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'Bkash' && styles.selectedPaymentMethod]}
          onPress={() => handlePaymentMethodSelect('Bkash')}
        >
          <Image source={require('../bkashLogo.png')} style={styles.paymentLogo} resizeMode="contain" />
          <Text style={styles.paymentMethodText}>{t('Bkash')}</Text>
        </TouchableOpacity>
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
  paymentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
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
  amountOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountOption: {
    borderWidth: 2,
    borderColor: '#0E9C7E',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  amountOptionText: {
    fontSize: 20,
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
    borderColor: '#0E9C7E',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default Deposit;
