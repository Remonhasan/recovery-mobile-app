import React, { useState, useEffect } from 'react';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

const Dailywork = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      const apiUrl = 'https://tr.recoveryitltd.com/api/daily-work';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      if (response.status === 200) {
        const json = await response.json();
        setData(json.withdraw || []);
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

  const handleJob = async (jobId: any) => {
    try {
      // Payload
      const payload = {
        job_id: jobId
      };

      // POST request
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch('https://tr.recoveryitltd.com/api/daily-work-action', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        sslPinning: { certs: ['mycert'] },
      });

      const data = await response.json();

      if (data.status === 'success') {
        Alert.alert('Success', 'Job Completed Successfully!');
        navigation.navigate('DashboardTabs');
      }
    } catch (error) {
      Alert.alert('Error', error.bodyString?.toString());
    }
  };

  const handleViewLink = (item: any) => {
    // Trigger handleJob before opening the link
    handleJob(item?.id);

    // Open the link in the browser
    if (item?.link) {
      Linking.openURL(item?.link).catch((err) => Alert.alert('Error', 'Failed to open the link.'));
    }
  };

  const renderItem = ({ item }: { item: { title: string; status: string; id: number; link: string } }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.title}</Text>
      {item?.status === 'INACTIVE' ? (<>
        <Text style={styles.inactiveCell}>{item?.status}</Text>
      </>) : (<>
        <Text style={styles.activeCell}>{item?.status}</Text>
      </>)}
      
      <TouchableOpacity onPress={() => handleViewLink(item)}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'left' }}>👁️‍🗨️ {t('View')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Complete Your Tasks')}</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#17A2B8" />
          <Text style={styles.loadingText}>{t('Loading, please wait...')}</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>{t('Task')}</Text>
            <Text style={styles.headerCell}>{t('Status')}</Text>
            <Text style={styles.headerCell}>{t('Action')}</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item?.id?.toString()}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{t('No Task Found !')}</Text>
              </View>
            }
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
    textAlign: 'left'
  },
  inactiveCell: {
    color: 'red', // Red text for inactive
    fontWeight: 'bold',
    textAlign: 'left', // Center text
  },
  activeCell: {
    color: 'green', // Green text for active
    fontWeight: 'bold',
    textAlign: 'left', // Center text
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
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#17A2B8',
  }
});

export default Dailywork;
