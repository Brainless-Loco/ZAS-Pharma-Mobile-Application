import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator  } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import SingleProduct from '../Product/SingleProduct';
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, CARD_HEADER_COLOR, CLICKABLE_TEXT_COLOR, INACTIVE_TAB_LABEL_COLOR } from '@/components/ui/CustomColor';

export default function ExpandableCategoryBox(
    { categoryTitle, products, onProductPress }:{ categoryTitle: string, products: any[], onProductPress: any}
) {
  const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <Pressable onPress={handleToggle} style={styles.boxContainer}>
      <View style={styles.TitleAndButtonContainer}>
        <View style={{ width: '85%' }}>
            <Text style={styles.categoryTitle}>{categoryTitle}</Text>
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
            !loading && isExpanded &&
                products.map((product, index) => (
                    <SingleProduct
                      isSearchItem={false} 
                      key={index}
                      product={product}
                      onPress={() => onProductPress(product)}
                    />
                ))
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
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  TitleAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    color: CARD_HEADER_COLOR,
    fontSize: 22,
    fontWeight: '500',
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
    },
  productContainer: {
    marginTop: 20,
  },
});
