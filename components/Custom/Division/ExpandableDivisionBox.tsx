import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator  } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import SingleProduct from '../Product/SingleProduct';
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, CARD_HEADER_COLOR, CLICKABLE_TEXT_COLOR, INACTIVE_TAB_LABEL_COLOR } from '@/components/ui/CustomColor';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default function ExpandableDivisionBox(
    { title, id }:{ title: string, id:string}
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleToggle = async () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setLoading(true);
      const productsRef = collection(db, `Divisions/${id}/Products`);
      try {
        const productData = await getDocs(productsRef);
        const productList = productData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts([...productList].sort((a:any, b:any) => a.title.localeCompare(b.title)) as any);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Pressable onPress={handleToggle} style={styles.boxContainer}>
      <View style={styles.TitleAndButtonContainer}>
        <View style={{ width: '85%' }}>
            <Text style={styles.divisionTitle}>{title}</Text>
        </View>
        <Text style={{ width: '15%', textAlign: 'right' }}>
          {isExpanded ? (
            <AntDesign name="upcircle" size={24} color={INACTIVE_TAB_LABEL_COLOR} />
          ) : (
            <AntDesign name="downcircle" size={24} color={BUTTON_COLOR} />
          )}
        </Text>
      </View>
      <View style={{marginTop: isExpanded? 20:0}}>
          {
          !loading && isExpanded && products.length>0 &&
              products.map((product, index) => (
                  <SingleProduct
                    isForDoseCalculation={false}
                    isSearchItem={false} 
                    key={index}
                    product={product}
                  />
              ))
          }
          {!loading && isExpanded && products.length<1 &&
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>No Medicine is found for this division.</Text>
              </View>
          }
          {loading && isExpanded &&
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
          }
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    width: '97%',
    marginHorizontal: 'auto',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 15,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
  },
  TitleAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divisionTitle: {
    color: CARD_HEADER_COLOR,
    fontSize: 25,
    fontFamily:'serif',
    fontWeight: 700,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: CLICKABLE_TEXT_COLOR,
    fontFamily:'serif',
  },
  productContainer: {
    marginTop: 20,
  },
});
