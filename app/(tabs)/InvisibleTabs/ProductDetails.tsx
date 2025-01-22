import Section from '@/components/Custom/Product/Section';
import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR,  TEXT_AVAILABLE_COLOR, TEXT_COLOR, TEXT_COLOR_2, TEXT_NOT_AVAILABLE_COLOR } from '@/components/ui/CustomColor';
import { db } from '@/utils/firebase';
import { useNavigation } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking } from 'react-native';


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

const ProductDetails = ({route}:{route:any}) => {
    const navigation = useNavigation();

    const {product} = route.params;

    const [generalInfo, setGeneralInfo] = useState({ medical_queries_link: '', report_adverse_events_link: '' });


    const getCountryWithFlag = (name: string)=>{
      const country = countries.find(country => country.name === name);
      return country ? `${country.name} ${country.flag}` : `${name} (Flag not found)`;
    }

    useEffect(() => {
      const fetchGeneralInfo = async () => {
        try {
          const docRef = doc(db, 'All-General-information', 'general-info');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setGeneralInfo(data as any);
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error fetching general info:', error);
        }
      };
  
      fetchGeneralInfo();
    }, []);

    

    const renderContent = () => [
      <View style={[styles.imageSliderContainer]}>
          <FlatList
            horizontal
            data={product.pictures}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.productImage} />
            )}
            showsHorizontalScrollIndicator={false}
            style={{height:'100%', marginVertical:'auto' }}
          />
      </View>,
      <View style={styles.categoryContainer}>
        <Text> 
          <Text style={styles.categoryLabel}>Category: &nbsp;</Text>
          <Text style={styles.categoryTitle}>{product.category}</Text>
        </Text>
      </View>,
      <Text key="title" style={styles.title}>{product.title}</Text>,
      <Text key="genericName" style={styles.genericName}>{product.generic_name}</Text>,
      <Text key="dosageForm" style={styles.dosageForm}>{product.dosage_form}</Text>,
      <Section key="manufacturer" label="Manufacturer" content={product.manufacturer_info.name} />,
      <Section key="origin" label="Origin" content={getCountryWithFlag(product.origin)} />,
      <Text key="pricesTitle" style={styles.priceSectionTitle}>Prices</Text>,
      <FlatList
        key="prices"
        data={product.available_strength}
        renderItem={({ item }) => (
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.option_title} ({item.package_size}) - {item.price}</Text>
            <Text style={item.if_available ? styles.available : styles.notAvailable}>
              {item.if_available ? 'Available' : 'Not Available'}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.allPricesContainer}
      />,
      <Section key="dosage" label="Dosage" content={product.dosing_information} isList />,
      <Section key="sideEffects" label="Side Effects" content={product.side_effects} isList />,
      <Section key="indications" label="Indications" content={product.indications} isList />,
      <View key="bottomButtons" style={styles.bottomButtons}>
        <TouchableOpacity onPress={()=>Linking.openURL(generalInfo.medical_queries_link)} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Medical Queries</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL(generalInfo.report_adverse_events_link)} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Report Adverse Events</Text>
        </TouchableOpacity>
      </View>,
      <Text key="knowMore" style={styles.knowMoreAboutText}>KNOW MORE ABOUT</Text>,
      <View key="bottomButtons" style={[styles.bottomButtons, {marginBottom:80}]}>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>Linking.openURL(product.additional_documents_link)}>
          <Text style={styles.bottomButtonText}>Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>Linking.openURL(product.manufacturer_info.website_link)}>
          <Text style={styles.bottomButtonText}>Manufacturer</Text>
        </TouchableOpacity>
      </View>
    ];
  
    return (
      <View 
          style={styles.container}>
          { product &&  <FlatList
            data={renderContent()}
            renderItem={({ item }) => item as any}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          /> }
          
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
    backgroundColor: 'white', 
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
    bottom:'2%',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 35,
    paddingHorizontal: 30,
    paddingVertical: 15,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.4,
    elevation: 5,
    opacity:0.9
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


const countries = [
  { name: "Albania", code: "AL", flag: "🇦🇱" },
  { name: "Argentina", code: "AR", flag: "🇦🇷" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Austria", code: "AT", flag: "🇦🇹" },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩" },
  { name: "Belgium", code: "BE", flag: "🇧🇪" },
  { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Bulgaria", code: "BG", flag: "🇧🇬" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Chile", code: "CL", flag: "🇨🇱" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", flag: "🇨🇴" },
  { name: "Croatia", code: "HR", flag: "🇭🇷" },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", flag: "🇩🇰" },
  { name: "Egypt", code: "EG", flag: "🇪🇬" },
  { name: "Finland", code: "FI", flag: "🇫🇮" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "Greece", code: "GR", flag: "🇬🇷" },
  { name: "Hungary", code: "HU", flag: "🇭🇺" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩" },
  { name: "Iran", code: "IR", flag: "🇮🇷" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "Kosovo", code: "XK", flag: "🇽🇰" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "Montenegro", code: "ME", flag: "🇲🇪" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬" },
  { name: "North Macedonia", code: "MK", flag: "🇲🇰" },
  { name: "Norway", code: "NO", flag: "🇳🇴" },
  { name: "Pakistan", code: "PK", flag: "🇵🇰" },
  { name: "Philippines", code: "PH", flag: "🇵🇭" },
  { name: "Poland", code: "PL", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", flag: "🇵🇹" },
  { name: "Romania", code: "RO", flag: "🇷🇴" },
  { name: "Russia", code: "RU", flag: "🇷🇺" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
  { name: "Serbia", code: "RS", flag: "🇷🇸" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "Slovakia", code: "SK", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", flag: "🇸🇮" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Sweden", code: "SE", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Thailand", code: "TH", flag: "🇹🇭" },
  { name: "Turkey", code: "TR", flag: "🇹🇷" },
  { name: "Ukraine", code: "UA", flag: "🇺🇦" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳" },
];