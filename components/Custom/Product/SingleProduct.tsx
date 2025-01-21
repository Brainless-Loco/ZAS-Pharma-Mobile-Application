import { CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, NESTED_CARD_COLOR, TEXT_AVAILABLE_COLOR, TEXT_COLOR_2, TEXT_NOT_AVAILABLE_COLOR } from '@/components/ui/CustomColor';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function SingleProduct({ product, onPress, isSearchItem=false }:{product:any, onPress:any, isSearchItem:boolean}) {
  return (
    <Pressable onPress={onPress} style={[styles.productBox,{
      backgroundColor: isSearchItem? CARD_BACKGROUND_COLOR:NESTED_CARD_COLOR
    }]}>
      <View style={styles.productInfo}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.genericName}>{product.genericName}</Text>
        <Text style={styles.strength}>{product.strengthForm}</Text>
      </View>
      <View style={styles.availability}>
        <Text style={[{ color: product.isAvailable ? TEXT_AVAILABLE_COLOR : TEXT_NOT_AVAILABLE_COLOR }, styles.availabilityText]}>
          {product.isAvailable ? 'Available' : 'Not Available'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  productBox: {
    backgroundColor: NESTED_CARD_COLOR,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 4,
    marginBottom: 6,
    flexDirection:'row',
  },
  productInfo: {
    flex: 2,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color:CLICKABLE_TEXT_COLOR,
    fontWeight: '500',
  },
  genericName: {
    fontSize: 14,
    color: TEXT_COLOR_2,
    marginVertical: 4,
    fontWeight:'400'
  },
  strength: {
    fontSize: 14,
    color: CLICKABLE_TEXT_COLOR,
    fontWeight:'500'
  },
  availability: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  availabilityText: {
    fontSize:12,
    fontWeight:'500'
  }
});
