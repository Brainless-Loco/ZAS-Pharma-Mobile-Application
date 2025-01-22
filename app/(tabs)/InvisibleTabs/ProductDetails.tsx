import Section from '@/components/Custom/Product/Section';
import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR,  TEXT_AVAILABLE_COLOR, TEXT_COLOR, TEXT_COLOR_2, TEXT_NOT_AVAILABLE_COLOR } from '@/components/ui/CustomColor';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';


const dummyProduct = {
  category: 'Antibiotics',
  title: 'Amoxicillin',
  genericName: 'Amoxicillin Trihydrate',
  dosageForm: 'Tablet',
  manufacturer: 'ABC Pharma Ltd.',
  manufacturerLink: 'https://abcpharma.com',
  origin: 'USA',
  additional_document_link: 'https://example.com/product-doc',
  prices: [
    { optionTitle: 'Standard', packageSize: '10 x 250mg', price: '$5', available: true },
    { optionTitle: 'Premium', packageSize: '10 x 500mg', price: '$9', available: false },
  ],
  dosage: ['Take one tablet every 8 hours with water.'],
  sideEffects: ['Nausea', 'Diarrhea', 'Skin rash'],
  indications: ['Bacterial infections', 'Upper respiratory tract infection'],
  images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbaR1ptnWsUX853xQpM5GmESS0ItfJJsc1Q&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbaR1ptnWsUX853xQpM5GmESS0ItfJJsc1Q&s'],
};

const ProductDetails = ({product}:{product:any}) => {
    const navigation = useNavigation();
    const renderContent = () => [
      <View style={[styles.imageSliderContainer]}>
          <FlatList
            horizontal
            data={dummyProduct.images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.productImage} />
            )}
            showsHorizontalScrollIndicator={false}
            style={{height:'100%', marginVertical:'auto' }}
          />
      </View>,
      ,
      <View style={styles.categoryContainer}>
        <Text> 
          <Text style={styles.categoryLabel}>Category: &nbsp;</Text>
          <Text style={styles.categoryTitle}>{dummyProduct.category}</Text>
        </Text>
      </View>,
      <Text key="title" style={styles.title}>{dummyProduct.title}</Text>,
      <Text key="genericName" style={styles.genericName}>{dummyProduct.genericName}</Text>,
      <Text key="dosageForm" style={styles.dosageForm}>{dummyProduct.dosageForm}</Text>,
      <Section key="manufacturer" label="Manufacturer" content={dummyProduct.manufacturer} />,
      <Section key="origin" label="Origin" content={dummyProduct.origin} />,
      <Text key="pricesTitle" style={styles.priceSectionTitle}>Prices</Text>,
      <FlatList
        key="prices"
        data={dummyProduct.prices}
        renderItem={({ item }) => (
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.optionTitle}: {item.packageSize} - {item.price}</Text>
            <Text style={item.available ? styles.available : styles.notAvailable}>
              {item.available ? 'Available' : 'Not Available'}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.allPricesContainer}
      />,
      <Section key="dosage" label="Dosage" content={dummyProduct.dosage} isList />,
      <Section key="sideEffects" label="Side Effects" content={dummyProduct.sideEffects} isList />,
      <Section key="indications" label="Indications" content={dummyProduct.indications} isList />,
      <View key="bottomButtons" style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Medical Queries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Report Adverse Events</Text>
        </TouchableOpacity>
      </View>,
      <Text key="knowMore" style={styles.knowMoreAboutText}>KNOW MORE ABOUT</Text>,
      <View key="bottomButtons" style={[styles.bottomButtons, {marginBottom:130}]}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Manufacturer</Text>
        </TouchableOpacity>
      </View>
    ];
  
    return (
      <View 
          style={styles.container}>
          <FlatList
            data={renderContent()}
            renderItem={({ item }) => item as any}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          
        <TouchableOpacity onPress={()=>{navigation.navigate('ResponsiblePersons' as never)}} key="orderButton" style={styles.orderButton}>
          <Text style={styles.buttonText}>Click to Order</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

export default ProductDetails;

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 15,
    backgroundColor: BACKGROUND_COLOR,
    position: 'relative' 
  },
  imageSliderContainer:{
    marginBottom: 15,
    height: 260,
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  productImage: { 
    width: 320, 
    height: 240, 
    marginRight: 5,
    marginVertical:'auto', 
    borderRadius: 10,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5, 

  },
  categoryContainer:{
    marginBottom:5
  },
  categoryLabel:{
    fontWeight: '500',
    color: TEXT_COLOR,
    fontSize: 14.5,
  },
  categoryTitle:{
    fontWeight: '700',
    color: CLICKABLE_TEXT_COLOR,
    fontSize: 14.5
  },
  title: { 
    fontSize: 28, 
    fontWeight: '500', 
    color: CLICKABLE_TEXT_COLOR,
  },
  genericName: { 
    fontSize: 15, 
    fontWeight: '500', 
    marginBottom: 5,
    color: TEXT_COLOR_2,
  },
  priceSectionTitle: { 
    fontWeight: '600',
    marginBottom: 5,
    fontSize:21,
    color: CLICKABLE_TEXT_COLOR
  },
  dosageForm: { 
    marginBottom: 10,
    color: TEXT_COLOR_2,
    fontWeight:'500',
    fontSize:16 
  },
  allPricesContainer:{
    marginBottom: 20,
  },
  priceContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 

  },
  priceText: { 
    fontSize: 16,
    color: TEXT_COLOR_2,
    marginLeft:15,
    fontWeight:'500'
  },
  available: { 
    color: TEXT_AVAILABLE_COLOR,
    fontSize:14,
    fontWeight:'500'
  },
  notAvailable: { 
    color: TEXT_NOT_AVAILABLE_COLOR,
    fontSize:14,
    fontWeight:'500'
  },
  orderButton: {
    position:'absolute',
    left:'58%',
    bottom:'10%',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 35,
    paddingHorizontal: 30,
    paddingVertical: 15,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.4,
    elevation: 5,
  },
  buttonText: { 
    color: CARD_BACKGROUND_COLOR,
    fontSize: 15,
    fontWeight: '600' 

  },
  bottomButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20 
  },
  bottomButton: { 
    flex: 1,
    justifyContent:'center',
    alignItems:'center', 
    marginHorizontal: 5, 
    paddingVertical: 15,
    paddingHorizontal: 5, 
    borderRadius: 35, 
    borderColor: BUTTON_COLOR,
    borderWidth:2,
    backgroundColor: CARD_BACKGROUND_COLOR,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,  
  },
  bottomButtonText:{
    fontSize: 12,
    fontWeight: '600',
    color:BUTTON_COLOR
  },
  knowMoreAboutText:{
    fontSize: 20,
    fontWeight: '600',
    color: TEXT_COLOR_2,
    marginVertical:5,
    textAlign:'center'
  }
});
