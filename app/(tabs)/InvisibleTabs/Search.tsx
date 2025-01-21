import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Text  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ExpandableCategoryBox from '@/components/Custom/Category/ExpandableCategoryBox';
import { useNavigation } from 'expo-router';
import SingleProduct from '@/components/Custom/Product/SingleProduct';

const dummyCategoriesData = [
  {
    categoryTitle: 'Pain Relief',
    products: [
      {
        title: 'Paracetamol',
        genericName: 'Acetaminophen',
        strengthForm: '500 mg in 10 tablets',
        isAvailable: true,
      },
      {
        title: 'Ibuprofen',
        genericName: 'Ibuprofen',
        strengthForm: '200 mg in 20 capsules',
        isAvailable: false,
      },
    ],
  },
  {
    categoryTitle: 'Antibiotics',
    products: [
      {
        title: 'Amoxicillin',
        genericName: 'Amoxicillin',
        strengthForm: '250 mg in 10 tablets',
        isAvailable: true,
      },
      {
        title: 'Azithromycin',
        genericName: 'Azithromycin',
        strengthForm: '500 mg in 5 tablets',
        isAvailable: true,
      },
    ],
  },
];

export default function Search({}) {
  const [isMedicineSearch, setIsMedicineSearch] = useState(true);
  const [loading, setLoading] = useState(false);

  
  const navigation = useNavigation();

  const toggleSearchType = () => {
    setIsMedicineSearch(!isMedicineSearch);
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetails' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#666" style={styles.searchIcon} />
        <TextInput
          placeholder={isMedicineSearch ? "Search Medicines..." : "Search Products..."}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={toggleSearchType} style={styles.swapButton}>
          <Ionicons name="swap-horizontal" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.searchItemsContainer}>
        {!loading &&
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        }
        {/* {dummyCategoriesData.map((category, index) => (
              <ExpandableCategoryBox 
                key={index}
                categoryTitle={category.categoryTitle}
                products={category.products}
                onProductPress={handleProductPress}
              />
            ))} */}
            {/* {dummyCategoriesData[0].products.map((product, index) => (
                <SingleProduct
                  isSearchItem={true} 
                  key={index}
                  product={product}
                  onPress={() => {}}
                />
            ))} */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 5,
    paddingTop:0
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 15,
    paddingHorizontal: 10,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
    margin: 10,
    marginBottom:10,
  },
  searchIcon: {
    marginRight: 10,
    opacity:0.3
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: TEXT_COLOR,
  },
  swapButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BUTTON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'50%'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: CLICKABLE_TEXT_COLOR,
  },
  searchItemsContainer: {
    marginHorizontal: 5
  }
});