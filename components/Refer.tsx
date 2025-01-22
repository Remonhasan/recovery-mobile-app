import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Refer = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Reference Section */}
      <View style={styles.referenceSection}>
        <Text style={styles.title}>Your Reference Link</Text>
        <Text style={styles.totalReferred}>Total Referred : 50</Text>
      </View>

      {/* Referral URL Section */}
      <View style={styles.cardSection}>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your referral URL"
          value="https://example.com/referral"
        />
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          You will get 10% commission on the amount deposited by the person you refer. If your refer joiner deposits 50,000 BDT, then you will get instant 5,000 BDT and you can withdraw that money instantly.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  referenceSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalReferred: {
    fontSize: 16,
    color: '#555',
  },
  cardSection: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  copyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
});

export default Refer;
