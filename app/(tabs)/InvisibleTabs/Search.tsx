import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
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
  searchItemsContainer: {
    marginHorizontal: 5
  }
});