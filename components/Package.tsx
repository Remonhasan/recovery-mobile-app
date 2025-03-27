import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const Package = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<any>(null);

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

      const apiUrl = 'https://recoveryitltd.com/api/package';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      const json = await response.json();
      setData(json.packages);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('Error fetching data.'),
        text2: t('Check internet connection. Try again..👋')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (id: any) => {
    setSelectedPackageId(id);
    setModalVisible(true);
  };

  const confirmBuyNow = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const apiUrl = `https://recoveryitltd.com/api/buy-package/${selectedPackageId}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      const json = await response.json();
      if (json.status === 'success') {

        Toast.show({
          type: 'success',
          position: 'top',
          text1: t('Bought Successfully !'),
          text2: t('You bought the package successfully!')
        });

        navigation.navigate('DashboardTabs');
      }
    } catch (error) {

      const parsedBody = JSON.parse(error.bodyString.trim());
      const errorMessage = parsedBody.error;

      Toast.show({
        type: 'error',
        text1: t('Package Bought Unsuccessfull.'),
        text2: errorMessage
      });

    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const cancelBuyNow = () => {
    setModalVisible(false);
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#17A2B8" />
        <Text style={styles.loadingText}>{t('Loading, please wait...')}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t('Choose Your Package')}</Text>
      <View style={styles.packageContainer}>
        {data?.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardTitle}>
              {t('Duration : ')} {i18n.language == 'en' ? item?.duration : toBn(item?.duration)} {t('Month')}
            </Text>
            <Text style={styles.cardPrice}>৳ {i18n.language == 'en' ? item?.price : toBn(item?.price)} </Text>
            <Text style={styles.cardDescription}>{item?.description}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyNow(item?.id)}>
              <Text style={styles.buyButtonText}>{t('Buy Now')}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Confirmation Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{t('Are you sure you want to buy this package?')}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonYes} onPress={confirmBuyNow}>
                <Text style={styles.modalButtonText}>{t('Yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={cancelBuyNow}>
                <Text style={styles.modalButtonText}>{t('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  packageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#0E9C7E",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 25,
    color: '#0E9C7E',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: '#0E9C7E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonYes: {
    backgroundColor: '#0E9C7E',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#E74C3C',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#17A2B8',
  }
});

export default Package;
