import React, { useState, useEffect } from 'react';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';
// import Package from './Package';

const PackageList = [
  { id: 1, title: 'কম্বো প্যাকেজ -১', price: 6000, description: 'কম্বো প্যাকেজ -২ কোর্সের নাম-Success of Freelancing কোর্স বিস্তারিত- - ১) ডাটা এন্ট্রি বেসিক টু এ্যাডভান্সড ২) ডিজিটাল মার্কেটিং বেসিক টু এ্যাডভান্সড ৩) গ্রাফিক্স ডিজাইন বেসিক টু এ্যাডভান্সড উপরের ৩ টি কোর্সের কম্বো প্যাকেজ, যার কোর্স কোর্স ফি ২৪,০০০ টাকা প্রথমে ১২,০০০ টাকা দিয়ে ভর্তি হতে হবে এবং বাকি ১২,০০০ ইনকাম করার পর পরিষোধ করতে পারবেন। ভর্তির ১ম দিন থেকেই মিনিমাম ২০০ টাকা ইনকাম।প্রতিদিন ৫ টি টাক্স,প্রতি টাক্স ৪০ টাকা। নোটঃ- ৫০% ছাড়ে ৬০০০ টাকা দিয়ে ভর্তি হতে পারবেন।' },
  { id: 2, title: 'সিঙ্গেল কোর্স', price: 3000, description: 'সিঙ্গেল কোর্স ;- ১) ডাটা এন্ট্রি বেসিক টু এ্যাডভান্সড ২) ডিজিটাল মার্কেটিং বেসিক টু এ্যাডভান্সড ৩) গ্রাফিক্স ডিজাইন বেসিক টু এ্যাডভান্সড ৪) ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট উপরের যে কোন সিংগেল ১ টি কোর্স , কোর্স ফি ১২,০০০ টাকা প্রথমে ৬০০০ টাকা দিয়ে ভর্তি হতে হবে এবং বাকি ৬০০০ ইনকাম করার পর পরিষোধ করতে পারবেন,, প্রতিদিন ৫ টি টাক্স ,প্রতি টাক্স-২০ টাকা, মিনিমাম ১০০ টাকা ইনকাম ,ভর্তির ১ম দিন থেকেই নোটঃ- ৫০% ছাড়ে ৩০০০ টাকা দিয়ে ভর্তি হতে পারবেন।' },
  { id: 3, title: 'স্পেশাল কঠিন প্যাকেজ-৩', price: 17500, description: 'স্পেশাল কম্বো প্যাকেজ -৩ কোর্সের নাম-Success of Freelancing কোর্স বিস্তারিত- - ১) ডাটা এন্ট্রি বেসিক টু এ্যাডভান্সড ২) ডিজিটাল মার্কেটিং বেসিক টু এ্যাডভান্সড ৩) গ্রাফিক্স ডিজাইন বেসিক টু এ্যাডভান্সড ৪) ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট ৫) সার্চ ইঞ্জিন অপটিমাইজেশন (এসইও (SEO) ৬) এপ্স ডেভেলপমেন্ট উপরের ৬ টি কোর্সের কম্বো প্যাকেজ, যার কোর্স কোর্স ফি ৭০,০০০ টাকা প্রথমে ৩৫,০০০ টাকা দিয়ে ভর্তি হতে হবে এবং বাকি ৩৫,০০০ ইনকাম করার পর পরিষোধ করতে পারবেন। ভর্তির ১ম দিন থেকেই ইনকামের গ্যারেন্টি, প্রতিদিন মিনিমাম ৭৫০ টাকা ইনকাম ,ভর্তির ১ম দিন থেকেই প্রতিদিন টাক্ষ ৫ টি ,প্রতি টাক্স ১৫০ টাকা নোটঃ- ৫০% ছাড়ে ১৭৫০০ টাকা দিয়ে ভর্তি হতে পারবেন।' },
  { id: 4, title: 'কম্বো প্যাকেজ -২', price: 9000, description: 'কম্বো প্যাকেজ -৩ ৩ টি কোর্সের কম্বো প্যাকেজ, যার কোর্স কোর্স ফি ৩৬,০০০ টাকা প্রথমে ১৮,০০০ টাকা দিয়ে ভর্তি হতে হবে এবং বাকি ১৮,০০০ ইনকাম করার পর পরিষোধ করতে পারবেন। ভর্তির ১ম দিন থেকেই ইনকামের গ্যারেন্টি, প্রতিদিন মিনিমাম ৩০০ টাকা ইনকাম ,ভর্তির ১ম দিন থেকেই ,প্রতিদিন ৫ টি টাক্স,প্রতি টাক্স ৬০ টাকা নোটঃ- ৫০% ছাড়ে ৯০০০ টাকা দিয়ে ভর্তি হতে পারবেন।' },
  { id: 5, title: 'V.V.I.P কম্বো প্যাকেজ -৪', price: 46000, description: 'VIP কম্বো প্যাকেজ -৪ কোর্সের নাম-Success of Freelancing কোর্স বিস্তারিত- - ১) ডাটা এন্ট্রি বেসিক টু এ্যাডভান্সড ২) ডিজিটাল মার্কেটিং বেসিক টু এ্যাডভান্সড ৩) গ্রাফিক্স ডিজাইন বেসিক টু এ্যাডভান্সড ৪) ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট ৫) সার্চ ইঞ্জিন অপটিমাইজেশন (এসইও (SEO) ৬) এপ্স ডেভেলপমেন্ট উপরের ৬ টি কোর্সের কম্বো প্যাকেজ, যার কোর্স কোর্স ফি ১৮৪,০০০ টাকা প্রথমে ৯২,০০০ টাকা দিয়ে ভর্তি হতে হবে এবং বাকি ৯২,০০০ ইনকাম করার পর পরিষোধ করতে পারবেন। ভর্তির ১ম দিন থেকেই ইনকামের গ্যারেন্টি, প্রতিদিন মিনিমাম ২২৫০ টাকা ইনকাম ,ভর্তির ১ম দিন থেকেই প্রতিদিন টাক্ষ ৫ টি ,প্রতি টাক্স ৪৫০ টাকা . নোটঃ- ৫০% ছাড়ে ৪৬০০০ টাকা দিয়ে ভর্তি হতে পারবেন।' },
];

const Package = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);


  // Load Schedule 
  const loadData = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const apiUrl = 'https://tr.recoveryitltd.com/api/package';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      const json = await response.json();
      // console.log("Api data", json.packages)
      setData(json.packages);
    } catch (error) {
      console.error(error);
      setError('Error fetching data. Check internet connection.');
    } finally {
      setLoading(false);
    }
  };

  console.log("Data", data)

  const handleBuyNow = (id : any) => {
    console.log("package id", id)
    setSelectedPackageId(id);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
            <Text style={styles.cardTitle}>{item.name} | {t('Duration: ')} {item?.duration} {t('Month')}</Text>
            <Text style={styles.cardPrice}>৳ {i18n.language == 'en' ? item.price : toBn(item.price)} </Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyNow(item?.id)}>
              <Text style={styles.buyButtonText}>{t('Buy Now')}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Popup Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{t('Are you sure you want to buy this package?')}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonYes} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>{t('Yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
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
  },
});

export default Package;
