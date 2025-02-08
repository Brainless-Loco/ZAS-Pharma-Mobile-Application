import { Text, StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';
import { useIsFocused } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import SingleProduct from '@/components/Custom/Product/SingleProduct';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';

export default function DoseCalculator() {
  
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const isFocused = useIsFocused();

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, 'Products');
      const productsSnapshot = await getDocs(productsRef);
      const products = productsSnapshot.docs.map(doc => doc.data()).filter(p=>p.hasDoseCalculation ==true);
      setProducts([...products].sort((a, b) => a.title.localeCompare(b.title)) as any)
      setLoading(false);
    } catch (error) {
      console.error('Error getting products: ', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      fetchProducts();
    }
  }, [isFocused]);

  return (
    <ScrollView  style={styles.container}>
      <SubHeader text={"The Medicines are organized in alphataical order."}/>
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      }
      {
        !loading && products.length>0 && 
          products.map((product, index) => (
              <SingleProduct
                isSearchItem={true}
                isForDoseCalculation = {true}
                key={index}
                product={product}
              />
          ))
      }
      
      <View style={{height:50}}></View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal:12,
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
    fontFamily:'serif',
  },
});