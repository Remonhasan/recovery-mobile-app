import React, { useState, useEffect } from 'react';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';

const NoticeBoard = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const removeHtmlTags = (str: string) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

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

      const apiUrl = 'https://tr.recoveryitltd.com/api/notice-board';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      if (response.status === 200) {
        const json = await response.json();
        setData(json.data.notices || []);
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


  const renderItem = ({ item }: { item: { title: string; description: string; id: number, action: string } }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.title}</Text>
      <Text style={styles.cell}>{removeHtmlTags(item.description)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Notice Board')}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>{t('Title')}</Text>
            <Text style={styles.headerCell}>{t('Description')}</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item?.id.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#0E9C7E',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NoticeBoard;
