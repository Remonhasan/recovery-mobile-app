import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [transactionNumber, setTransactionNumber] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

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
        <Text style={styles.balanceText}>Balance: 0 BDT</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Transaction Number"
          value={transactionNumber}
          onChangeText={setTransactionNumber}
        />
        <Text style={styles.minDepositText}>Minimum deposit 500 BDT</Text>
      </View>

      <View style={styles.amountOptionsContainer}>
        {[500, 1000, 2000, 3000, 5000, 6000, 9000, 15000, 20000, 25000].map((value) => (
          <TouchableOpacity key={value} style={styles.amountOption} onPress={() => setAmount(value.toString())}>
            <Text style={styles.amountOptionText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'Bkash' && styles.selectedPaymentMethod]}
          onPress={() => handlePaymentMethodSelect('Bkash')}
        >
          <Text style={styles.paymentMethodText}>Bkash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'Nogod' && styles.selectedPaymentMethod]}
          onPress={() => handlePaymentMethodSelect('Nogod')}
        >
          <Text style={styles.paymentMethodText}>Nogod</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'Rocket' && styles.selectedPaymentMethod]}
          onPress={() => handlePaymentMethodSelect('Rocket')}
        >
          <Text style={styles.paymentMethodText}>Rocket</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  amountOptionText: {
    fontSize: 16,
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
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Deposit;
