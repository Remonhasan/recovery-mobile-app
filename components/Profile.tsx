import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const Profile = () => {
  const { t, i18n } = useTranslation();

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
          <Text style={styles.cardTitle}>{t('Total Deposit')}</Text>
          <Text style={styles.cardValue}>৳ {i18n.language == 'en' ? 500 : toBn(500)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Total Withdraw')}</Text>
          <Text style={styles.cardValue}>৳ {i18n.language == 'en' ? 2000 : toBn(2000)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Available Balance')}</Text>
          <Text style={styles.cardValue}>৳ {i18n.language == 'en' ? 3000 : toBn(3000)}</Text>
        </View>
      </View>

      {/* Additional Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('Total Package')} :</Text>
          <Text style={styles.infoValue}>৳ {i18n.language == 'en' ? 10 : toBn(10)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('Total Refer Code')} :</Text>
          <Text style={styles.infoValue}>৳ {i18n.language == 'en' ? 5 : toBn(5)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('Total Referred')} :</Text>
          <Text style={styles.infoValue}>৳ {i18n.language == 'en' ? 50 : toBn(50)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('Completed Tasks')} :</Text>
          <Text style={styles.infoValue}>৳ {i18n.language == 'en' ? 20 : toBn(20)}</Text>
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
