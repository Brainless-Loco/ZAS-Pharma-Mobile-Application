import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, NESTED_CARD_COLOR, TEXT_AVAILABLE_COLOR, TEXT_COLOR_2, TEXT_NOT_AVAILABLE_COLOR } from '@/components/ui/CustomColor';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


type RootStackParamList = {
  'ProductDetails': { product: object };
  'Dose Calculator For A Product': {product: object}
};


export default function SingleProduct({ product, isSearchItem=false, isForDoseCalculation=false }:{product:any, isSearchItem:boolean, isForDoseCalculation:boolean}) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const isAvailable = product.available_strength?.some((strength: { if_available: boolean }) => strength.if_available) ?? false;

  if(isForDoseCalculation){
    return(
      <View style={styles.productBoxForDoseCalculator}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.genericName}>{product.generic_name}</Text>
        <Pressable style={styles.doseCalculatorNavigationBtn} onPress={()=>{navigation.navigate('Dose Calculator For A Product',{product})}}>
          <Text>
          <MaterialCommunityIcons name="calculator-variant" size={25} color={BUTTON_COLOR} /></Text>
          <Text style={styles.doseCalculatorNavigationBtnText}>Open Dose Calculator</Text>
        </Pressable>
    </View>
    )
  }
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
  productBoxForDoseCalculator:{
    backgroundColor: CARD_BACKGROUND_COLOR,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 4,
    marginBottom: 6,
  },
  doseCalculatorNavigationBtn:{
    flexDirection: 'row',
  },
  doseCalculatorNavigationBtnText:{
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 5,
    color: BUTTON_COLOR
  },
  productInfo: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color:CLICKABLE_TEXT_COLOR,
    fontWeight: '500',
  },
  genericName: {
    fontSize: 17,
    color: TEXT_COLOR_2,
    marginVertical: 3,
    fontWeight:'400'
  },
  strength: {
    fontSize: 16,
    color: CLICKABLE_TEXT_COLOR,
    fontWeight:'500'
  },
  availability: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  availabilityText: {
    fontSize:15,
    fontWeight:'500',
    textAlign:'center',
  }
});
