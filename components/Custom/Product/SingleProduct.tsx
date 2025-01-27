import { CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, NESTED_CARD_COLOR, TEXT_AVAILABLE_COLOR, TEXT_COLOR_2, TEXT_NOT_AVAILABLE_COLOR } from '@/components/ui/CustomColor';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


type RootStackParamList = {
  ProductDetails: { product: object };
};


export default function SingleProduct({ product, isSearchItem=false }:{product:any, isSearchItem:boolean}) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const isAvailable = product.available_strength?.some((strength: { if_available: boolean }) => strength.if_available) ?? false;

  
  return (
    <Pressable 
        onPress={()=>{navigation.navigate('ProductDetails',{product})}} style={[styles.productBox,{
      backgroundColor: isSearchItem? CARD_BACKGROUND_COLOR:NESTED_CARD_COLOR
    }]}>
      <View style={styles.productInfo}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.genericName}>{product.generic_name}</Text>
      <Text style={styles.strength}>{product.available_strength[0].option_title}</Text>
      </View>
      <View style={styles.availability}>
        <Text style={[{ color: isAvailable ? TEXT_AVAILABLE_COLOR : TEXT_NOT_AVAILABLE_COLOR }, styles.availabilityText]}>
          {isAvailable ? 'Available' : 'Not Available'}
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
