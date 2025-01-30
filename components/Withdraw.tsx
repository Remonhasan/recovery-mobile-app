import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const Withdraw = () => {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState('');
  const [transactionNumber, setTransactionNumber] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [number, setNumber] = useState('');

  // Payload
  const payload = {
      phone_number : number,
      amount : amount
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
        <Text style={styles.balanceText}>{t('Balance')} : ৳ {i18n.language == 'en' ? 0 : toBn(0)}</Text>
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
        <Text style={styles.label}>{t('Mobile Number')} :</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Mobile Number')}
          value={number}
          onChangeText={setNumber}
        />
        <Text style={styles.label}>{t('Amount')} :</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Amount')}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Text style={styles.minDepositText}>{t('Minimum withdraw 500 BDT')}</Text>
      </View>

      <TouchableOpacity style={styles.submitButton}>
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
    color : "#0E9C7E",
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
  },
});

export default Withdraw;
