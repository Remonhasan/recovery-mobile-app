import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const tasks = [
  { id: '1', task: 'Task 1', status: 'Pending', action: 'Start' },
  { id: '2', task: 'Task 2', status: 'In Progress', action: 'Continue' },
  { id: '3', task: 'Task 3', status: 'Completed', action: 'Review' },
];

const Dailywork = () => {
  const { t, i18n } = useTranslation();

  const renderItem = ({ item }: { item: { task: string; status: string; action: string } }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.task}</Text>
      <Text style={styles.cell}>{item.status}</Text>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>{item.action}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Complete Your Tasks')}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>{t('Task')}</Text>
        <Text style={styles.headerCell}>{t('Status')}</Text>
        <Text style={styles.headerCell}>{t('Action')}</Text>
      </View>
      <FlatList
        data={tasks}
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

export default Dailywork;
