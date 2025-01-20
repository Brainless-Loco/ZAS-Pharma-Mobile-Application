import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExpandableCategoryBox from '@/components/Custom/Category/ExpandableCategoryBox';
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';

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

export default function Categories() {
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation();

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetails' as never);
  };




  return (
    <ScrollView style={styles.container}>
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      }
      
      {!loading && dummyCategoriesData.map((category, index) => (
        <ExpandableCategoryBox 
          key={index}
          categoryTitle={category.categoryTitle}
          products={category.products}
          onProductPress={handleProductPress}
        />
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 5,
    paddingTop:15,
    paddingHorizontal:12
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
});