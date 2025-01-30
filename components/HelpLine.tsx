import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Helpline = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Need Help?</Text>
        <Text style={styles.subtitle}>We are Here for You!</Text>
      </View>

      {/* Card Section */}
      <View style={styles.cardSection}>
        <Text style={styles.cardTitle}>Contact Our Support Team</Text>
        <Text style={styles.cardText}>WhatsApp: 01762666121</Text>
        <Text style={styles.cardText}>Email: recoveryit75@gmail.com</Text>
        <Text style={styles.cardText}>Facebook: Recovery IT</Text>
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
  headerSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  cardSection: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    borderTopColor : '#0E9C7E',
    borderTopWidth: 5,
    borderColor : '#0E9C7E',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default Helpline;
