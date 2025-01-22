import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const PackageList = [
  { id: 1, title: 'কঠিন প্যাকেজ-১', price: 6700, description: 'কঠিন প্যাকেজ-১ এর বিস্তারিত বিবরণ ...' },
  { id: 2, title: 'সিম্পল কোর্স', price: 5000, description: 'সিম্পল কোর্স এর বিস্তারিত বিবরণ ...' },
  { id: 3, title: 'স্পেশাল কঠিন প্যাকেজ-৩', price: 20100, description: 'স্পেশাল কঠিন প্যাকেজ-৩ এর বিস্তারিত বিবরণ ...' },
  { id: 4, title: 'কঠিন প্যাকেজ-২', price: 10000, description: 'কঠিন প্যাকেজ-২ এর বিস্তারিত বিবরণ ...' },
  { id: 5, title: 'V.V.I.P কঠিন প্যাকেজ-৪', price: 51000, description: 'V.V.I.P কঠিন প্যাকেজ-৪ এর বিস্তারিত বিবরণ ...' },
];

const Package = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Choose Your Package</Text>
      <View style={styles.packageContainer}>
        {PackageList.map(pkg => (
          <View key={pkg.id} style={styles.card}>
            <Text style={styles.cardTitle}>{pkg.title}</Text>
            <Text style={styles.cardPrice}>{pkg.price} BDT</Text>
            <Text style={styles.cardDescription}>{pkg.description}</Text>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Package;
