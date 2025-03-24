import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetch } from 'react-native-ssl-pinning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { toBn } from '../utils/util';

const Dashboard = ({ navigation }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

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

      const apiUrl = 'https://tr.recoveryitltd.com/api/balance';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        sslPinning: { certs: ['mycert'] },
      });

      const json = await response.json();
      setBalance(json?.balance);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error fetching data. Check internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle hover effect
  const handlePressIn = (index) => {
    setHoveredIndex(index);
  };

  const handlePressOut = () => {
    setHoveredIndex(null);
  };

  const toggleBalance = () => {
    if (!showBalance && balance === null) {
      loadData();
    }
    setShowBalance((prev) => !prev);
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../welcomebnr.png')}
          style={styles.welcomlogo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{t('All Services')}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleBalance}>
        <View style={styles.iconContainer}>
          <Image source={require("../taka.png")} style={styles.icon} />
        </View>
        <Text style={styles.balanceText}>
        {loading ? t('Loading...') : showBalance ? `৳ ${i18n.language === 'en' ? balance : toBn(balance)}` : t('Tap for Balance')}
        </Text>
      </TouchableOpacity>



      {/* Card Block Container */}
      <View style={styles.cardsContainer}>
        {/* Card 1 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 0 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(0)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Daily Work'))}
        >
          <Image source={require('../daily-work.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Daily Work')}</Text>
        </TouchableOpacity>

        {/* Card 2 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 1 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(1)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Deposit'))}
        >
          <Image source={require('../deposit.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Deposit')}</Text>
        </TouchableOpacity>

        {/* Card 3 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 2 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(2)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Withdraw'))}
        >
          <Image source={require('../withdraw.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Withdraw')}</Text>
        </TouchableOpacity>

        {/* Card 4 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 3 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(3)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Package'))}
        >
          <Image source={require('../package.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Package')}</Text>
        </TouchableOpacity>

        {/* Card 5 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 4 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(4)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Profile'))}
        >
          <Image source={require('../profile.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Profile')}</Text>
        </TouchableOpacity>

        {/* Card 6 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 5 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(5)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Refer'))}
        >
          <Image source={require('../refer.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Refer')}</Text>
        </TouchableOpacity>

        {/* Card 7 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 6 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(6)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Transaction'))}
        >
          <Image source={require('../transection.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Transaction')}</Text>
        </TouchableOpacity>

        {/* Card 8 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 7 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(7)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Notice Board'))}
        >
          <Image source={require('../notice.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Notice Board')}</Text>
        </TouchableOpacity>

        {/* Card 9 */}
        <TouchableOpacity
          style={[
            styles.card,
            hoveredIndex === 8 && styles.cardHovered,
          ]}
          onPressIn={() => handlePressIn(8)}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate(t('Helpline'))}
        >
          <Image source={require('../helpline.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{t('Helpline')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E3FFF5',
  },
  logoContainer: {
    alignItems: 'center',
    // marginTop: 10,
  },
  welcomlogo: {
    width: 800,
    height: 200,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginVertical: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    width: '45%',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    borderTopColor: '#0E9C7E',
    borderTopWidth: 5,
    borderColor: '#a70000',
    borderWidth: 1,
    transition: 'all 0.3s ease', // This won't work in React Native, but it's included for reference.
  },
  cardHovered: {
    elevation: 5,
    shadowOpacity: 0.3,
    backgroundColor: '#E2E8F0', // Change background color on hover
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 5,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#a70000",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6FFF3",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignSelf: "center",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E91E63",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: "#FFF",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#008D63",
  },
  // Removed cardDescription style
});

export default Dashboard;
