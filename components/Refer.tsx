import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';
import { toBn } from '../utils/util';

const Refer = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadName();
  }, []);

  const loadName = async () => {
    const accessUserName = await AsyncStorage.getItem('accessUserName');
    setUsername(accessUserName);
  };

  // Handle the copy action
  const handleCopy = () => {
    const referralUrl = `https://tr.recoveryitltd.com/registration?ref=${username}`;
    Clipboard.setString(referralUrl);
    Toast.show({
      type: 'success',
      text1: t('Copied Successfully !'),
      text2: t('Your referral link has been copied.')
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Reference Section */}
      <View style={styles.referenceSection}>
        <Text style={styles.title}>{t('Your Reference Link')}</Text>
        {/* <Text style={styles.totalReferred}>{t('Total Referred')} : ৳ {i18n.language == 'en' ? 50 : toBn(50)}</Text> */}
      </View>

      {/* Referral URL Section */}
      <View style={styles.cardSection}>
        <TextInput
          style={styles.inputBox}
          placeholder={t('Enter your referral URL')}
          value={`https://tr.recoveryitltd.com/registration?ref=${name}`}
          editable={false} // Make the TextInput non-editable as it's showing the referral link
        />
        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
          <Text style={styles.copyButtonText}>{t('Copy')}</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          {t('You will get 10% commission on the amount deposited by the person you refer. If your refer joiner deposits 50,000 BDT, then you will get instant 5,000 BDT and you can withdraw that money instantly.')}
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
    borderColor: '#0E9C7E',
    borderWidth: 1,
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
    backgroundColor: '#0E9C7E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
});

export default Refer;
