import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userSection}>
        <Image
          source={require('../profile.png')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userMobile}>+123 456 7890</Text>
      </View>

      {/* Card Block Section */}
      <View style={styles.cardSection}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Deposit</Text>
          <Text style={styles.cardValue}>$5000</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Withdraw</Text>
          <Text style={styles.cardValue}>$2000</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Available Balance</Text>
          <Text style={styles.cardValue}>$3000</Text>
        </View>
      </View>

      {/* Additional Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Package :</Text>
          <Text style={styles.infoValue}>10</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Refer Code :</Text>
          <Text style={styles.infoValue}>5</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Referred :</Text>
          <Text style={styles.infoValue}>50</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Completed Tasks :</Text>
          <Text style={styles.infoValue}>20</Text>
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
    borderTopColor : '#0E9C7E',
    borderTopWidth: 5,
    borderColor : '#0E9C7E',
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
    borderColor : '#0E9C7E',
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
