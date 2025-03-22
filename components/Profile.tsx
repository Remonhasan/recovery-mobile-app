import React, { useState, useEffect } from 'react';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const Profile = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadData();
    loadName();
  }, []);

  const loadName = async () => {
    const sessionName = await AsyncStorage.getItem('accessName');
    const accessPhone = await AsyncStorage.getItem('accessPhone');
    setName(sessionName);
    setPhone(accessPhone);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const apiUrl = 'https://tr.recoveryitltd.com/api/profile';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      if (response.status === 200) {
        const responseData = await response.json();
        setData(responseData);
      } else {
        setError('Error fetching data');
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching data. Check internet connection.');
    } finally {
      setLoading(false);
    }
  };

  function roundPrice(price?: number, decimals: number = 0): number {
    if (typeof price !== "number") return 0; // Default to 0 if price is undefined or not a number
    return Number(price.toFixed(decimals));
  }

  return (
    <ScrollView style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userSection}>
        <Image
          source={require('../profile.png')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userMobile}>{phone}</Text>
      </View>

      {/* Card Block Section */}
      <View style={styles.cardSection}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Total Deposit')}</Text>
          <Text style={styles.cardValue}>{i18n.language == 'en' ? roundPrice(data?.totalDeposit?.price) : toBn(roundPrice(data?.totalDeposit?.price))}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Total Withdraw')}</Text>
          <Text style={styles.cardValue}>{i18n.language == 'en' ? roundPrice(data?.totalWithdraw) : toBn(roundPrice(data?.totalWithdraw))}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Available Balance')}</Text>
          <Text style={styles.cardValue}>{i18n.language == 'en' ? roundPrice(data?.availableBalance) : toBn(roundPrice(data?.availableBalance))}</Text>
        </View>
      </View>

      {/* Additional Info Section */}
      <View style={styles.infoSection}>
        {/* <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('Total Package')} :</Text>
          <Text style={styles.infoValue}>৳ {i18n.language == 'en' ? 10 : toBn(10)}</Text>
        </View> */}
        {/* <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('Total Refer Code')} :</Text>
          <Text style={styles.infoValue}>৳ {i18n.language == 'en' ? 5 : toBn(5)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('Total Referred')} :</Text>
          <Text style={styles.infoValue}>৳ {i18n.language == 'en' ? 50 : toBn(50)}</Text>
        </View> */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('Completed Tasks')} :</Text>
          <Text style={styles.infoValue}>৳ {i18n.language == 'en' ? data?.completeJob : toBn(data?.completeJob)}</Text>
        </View>
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
  userSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userMobile: {
    fontSize: 16,
    color: '#555',
  },
  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderTopColor: '#0E9C7E',
    borderTopWidth: 5,
    borderColor: '#0E9C7E',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#555',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoSection: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    borderColor: '#0E9C7E',
    borderWidth: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
