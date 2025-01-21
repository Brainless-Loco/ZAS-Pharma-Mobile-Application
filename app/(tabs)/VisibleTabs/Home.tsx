import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, TEXT_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <TouchableOpacity style={styles.searchButton} onPress={() => {
          navigation.navigate('Search' as never)
        }}>
        <Ionicons name="search" size={25} color={BACKGROUND_COLOR} />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbaR1ptnWsUX853xQpM5GmESS0ItfJJsc1Q&s' }} style={styles.logo} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Categories' as never)}>
          <Text style={styles.buttonText}>Our All Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ResponsiblePersons' as never)}>
          <Text style={styles.buttonText}>Click to Order</Text>
        </TouchableOpacity>
      </View>

      {/* Advertisement Section */}
      <View style={styles.advertisementContainer}>
        <Text style={styles.adText}>Latest Update</Text>
        <Image source={{ uri: 'https://external-preview.redd.it/tUapPFycZENmYtLSKR4MNkni72_pJgcRCIrxoTYHvWQ.png?auto=webp&s=cb5887733fe77d825e3f7eadb06fe2dfd4ae380f' }} style={styles.adImage} />
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: BUTTON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginLeft:'auto',
    marginBottom:40
  },
  logo: {
    width: '100%',
    height: 65,
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
    width: '65%',
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
    fontSize: 14,
    fontWeight:'600',
    textAlign: 'center',
  },
  advertisementContainer: {
    alignItems: 'center',
    marginTop: 10,
    width:'100%'
  },
  adText: {
    fontSize: 14,
    marginBottom: 40,
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
