import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, TEXT_COLOR, } from '@/components/ui/CustomColor';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';


export default function Home() {
  const navigation = useNavigation();
  const [bannerLink, setBannerLink] = useState('');

  const fetchBannerLink = async () => {
    try {
      const docRef = doc(db, 'Featured-Banner', 'latest-banner');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBannerLink(docSnap.data()['banner-link']); // Fetching the banner-link field
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.error('Error fetching banner:', err);
    }
  };

  useEffect(() => {
    fetchBannerLink();
  }, []);
  
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <TouchableOpacity style={styles.searchButton} onPress={() => {
          navigation.navigate('Search' as never)
        }}>
        <Ionicons name="search" size={30} color={BACKGROUND_COLOR} />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require('@/assets/images/zas-group-logo.png')} style={styles.logo} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Divisions' as never)}>
          <Text style={styles.buttonText}>Our All Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ResponsiblePersons' as never)}>
          <Text style={styles.buttonText}>Click to Order</Text>
        </TouchableOpacity>
      </View>

      {/* Advertisement Section */}
      <View style={styles.advertisementContainer}>
        <Text style={styles.adText}>Latest Update</Text>
        {bannerLink ==''? <Text>No Banner found..</Text>:<Image source={{ uri: bannerLink }} style={styles.adImage} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR
  },
  searchButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: BUTTON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginLeft:'auto',
    marginBottom:40
  },
  logo: {
    width: '100%',
    height: 75,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: BUTTON_COLOR,
    width: '75%',
    paddingVertical: 15,
    borderRadius: 40,
    marginVertical: 8,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
  },
  buttonText: {
    color: BACKGROUND_COLOR,
    fontSize: 18,
    fontFamily:'serif',
    fontWeight: 700,
    textAlign: 'center',
  },
  advertisementContainer: {
    alignItems: 'center',
    marginTop: 10,
    width:'100%'
  },
  adText: {
    fontSize: 16,
    fontFamily:'serif',
    marginBottom: 25,
    color: TEXT_COLOR,
    fontWeight:'800',
  },
  adImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    backgroundColor:CARD_BACKGROUND_COLOR,
    borderRadius: 10,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
  },
});
