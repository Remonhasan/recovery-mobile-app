import React, { useState, useEffect } from 'react';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const Transaction = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to check if more data exists

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (pageNumber = 1, append = false) => {
    if (isFetchingMore) return;

    if (!append) setLoading(true);
    else setIsFetchingMore(true);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const apiUrl = `https://recoveryitltd.com/api/transaction?page=${pageNumber}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      if (response.status === 200) {
        const json = await response.json();
        const newData = json.withdraw?.data || [];

        if (append) {
          setData(prevData => [...prevData, ...newData]);
        } else {
          setData(newData);
        }

        setHasMore(newData.length > 0); // If no new data, stop fetching
      } else {
        Alert.alert('Error','Error fetching data');
      }
    } catch (error) {
      // console.error(error);
      Alert.alert('Error', 'Error fetching data. Check internet connection.');
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const loadMoreData = () => {
    if (!isFetchingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadData(nextPage, true);
    }
  };

  function formatDateTime(timestamp: string, locale: string = 'en-US'): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    }).format(new Date(timestamp));
  }

  const renderItem = ({ item }: { item: { created_at: string; type: string; amount: string } }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{formatDateTime(item.created_at)}</Text>
      <Text style={styles.cell}>{item.type}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Your Transactions')}</Text>

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
            <Text style={styles.headerCell}>{t('Date')}</Text>
            <Text style={styles.headerCell}>{t('Type')}</Text>
            <Text style={styles.headerCell}>{t('Action')}</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item?.id?.toString()}
            onEndReached={loadMoreData} // Load more when scrolling to the end
            onEndReachedThreshold={0.5} // Trigger when halfway down
            ListFooterComponent={
              isFetchingMore ?
                // <ActivityIndicator size="large" color="#17A2B8" /> 
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#17A2B8" />
                  <Text style={styles.loadingText}>{t('Loading, please wait...')}</Text>
                </View>
                : null
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
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
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

export default Transaction;
