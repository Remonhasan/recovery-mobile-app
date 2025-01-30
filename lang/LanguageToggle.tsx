import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  // Track the current language
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  // Update the local state when the language changes globally
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLanguage); // Change language globally using i18next
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeLanguage} style={styles.toggle}>
        <View
          style={[
            styles.indicator,
            currentLanguage === 'en' ? styles.activeEN : styles.activeBN,
          ]}
        />
        <Text style={[styles.labelEN, currentLanguage === 'en' && styles.activeText]}>
          EN
        </Text>
        <Text style={[styles.labelBN, currentLanguage === 'bn' && styles.activeText]}>
          BN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  toggle: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0E9C7E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#FFC300',
    zIndex: 0,
  },
  activeEN: {
    left: 0,
  },
  activeBN: {
    left: '50%',
  },
  labelEN: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
  },
  labelBN: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
  },
  activeText: {
    color: '#000', // Change active text color to black for better contrast when it's active
  },
});

export default LanguageToggle;
