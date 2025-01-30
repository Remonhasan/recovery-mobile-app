import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const transactions = [
  { id: 1, date: '2025-01-01', type: 'Withdraw', amount: '3000' },
  { id: 2, date: '2025-02-01', type: 'Withdraw', amount: '5000'},
  { id: 3, date: '2025-03-01', type: 'Withdraw', amount: '6000'},
];

const Transaction = () => {
  const renderItem = ({ item }: { item: { date: string; type: string; amount: string } }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.type}</Text>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>{item.amount}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Type</Text>
        <Text style={styles.headerCell}>Amount</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
    marginTop : 10,
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
});

export default Transaction;
