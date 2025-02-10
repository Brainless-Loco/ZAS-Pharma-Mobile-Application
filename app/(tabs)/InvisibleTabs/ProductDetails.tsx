import Section from '@/components/Custom/Product/Section';
import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR,  TEXT_AVAILABLE_COLOR, TEXT_COLOR, TEXT_COLOR_2, TEXT_NOT_AVAILABLE_COLOR } from '@/components/ui/CustomColor';
import { db } from '@/utils/firebase';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking } from 'react-native';

type RootStackParamList = {
  ResponsiblePersons: { toBeExpandedDivisionId: string, toBeExpandedDivisionTitle: string };
};

const ProductDetails = ({route}:{route:any}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
      <View style={styles.categoryAndGenericNameContainer}>
        <Text> 
          <Text style={styles.catAndGNLabel}>Category: &nbsp;</Text>
          <Text style={styles.catAndGNTitle}>{product.category}</Text>
        </Text>
        <Text> 
          <Text style={styles.catAndGNLabel}>Generic Name: &nbsp;</Text>
          <Text style={styles.catAndGNTitle}>{product.generic_name}</Text>
        </Text>
      </View>,
      <Text key="title" style={styles.title}>{product.title}</Text>,
      <Text key="dosageForm" style={styles.dosageForm}>{product.dosage_form}</Text>,
      <Text key="pricesTitle" style={styles.priceSectionTitle}>Prices</Text>,
      <FlatList
        key="prices"
        data={product.available_strength}
        renderItem={({ item }) => (
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.option_title} ({item.package_size}) - {item.price}</Text>
            <Text style={item.if_available ? styles.available : styles.notAvailable}>
              {item.if_available ? '[Available]' : '[Not Available]'}
            </Text>
          </View>
          
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.allPricesContainer}
      />,
      <Section key="manufacturer" label="Manufacturer" content={product.manufacturer_info.name} />,
      <Section key="ma_holder" label="MA Holder" content={ product.manufacturer_info.ma_holder} />,
      <Section key="origin" label="Origin" content={getCountryWithFlag(product.origin)} />,
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
          
        <TouchableOpacity onPress={()=>{navigation.navigate('ResponsiblePersons',{toBeExpandedDivisionId:product.divisionId, toBeExpandedDivisionTitle:product.divisionTitle})}} key="orderButton" style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Click to Order</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

export default ProductDetails;

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 12,
    backgroundColor: BACKGROUND_COLOR,
    position: 'relative' 
  },
  imageSliderContainer:{
    marginBottom: 15,
    height: 260,
    width:'100%',
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  productImage: { 
    width: 320, 
    height: 240, 
    marginRight: 6,
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
  categoryAndGenericNameContainer:{
    gap:2
  },
  catAndGNLabel:{
    fontWeight: 600,
    color: TEXT_COLOR,
    fontSize: 18,
    fontFamily: 'serif',
  },
  catAndGNTitle:{
    fontWeight: '700',
    color: CLICKABLE_TEXT_COLOR,
    fontSize: 19,
    fontFamily: 'serif',
  },
  title: { 
    fontSize: 35, 
    fontWeight: 900, 
    fontFamily: 'serif',
    color: CLICKABLE_TEXT_COLOR,
    paddingVertical:5,
    textShadowColor: TEXT_COLOR,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  genericName: { 
    fontSize: 15, 
    fontWeight: '500', 
    fontFamily: 'serif',
    marginBottom: 5,
    color: TEXT_COLOR_2,
  },
  priceSectionTitle: { 
    fontWeight: 700,
    fontSize:25,
    fontFamily: 'serif',
    color: CARD_BACKGROUND_COLOR,
    backgroundColor: BUTTON_COLOR,
    paddingHorizontal:10,
    paddingVertical: 5,
    borderRadius: 5,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0
  },
  allPricesContainer:{
    marginBottom: 20,
    paddingVertical:5,
    paddingHorizontal:5,
    borderWidth:1,
    borderColor: BUTTON_COLOR,
    backgroundColor:BACKGROUND_COLOR,
    borderRadius: 5,
    borderTopRightRadius:0,
    borderTopLeftRadius:0,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  priceContainer: { 
    display:'flex',
    flexWrap:'wrap',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems:'center',
    paddingVertical:2

  },
  priceText: { 
    fontSize: 18,
    fontFamily: 'serif',
    color: TEXT_COLOR_2,
    fontWeight:'600'
  },
  available: { 
    color: TEXT_AVAILABLE_COLOR,
    fontSize:14,
    fontWeight:'500',
    fontFamily: 'serif',
  },
  notAvailable: { 
    color: TEXT_NOT_AVAILABLE_COLOR,
    fontSize:14,
    fontWeight:'500',
    fontFamily: 'serif',
  },
  dosageForm: { 
    marginBottom: 10,
    color: TEXT_COLOR_2,
    fontWeight:'500',
    fontSize:18,
    fontFamily: 'serif',
  },
  orderButton: {
    position:'absolute',
    right:'2%',
    bottom:'2%',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 35,
    paddingHorizontal: 30,
    paddingVertical: 15,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.4,
    elevation: 5,
    opacity:0.95
  },
  orderButtonText: { 
    color: CARD_BACKGROUND_COLOR,
    fontSize: 18,
    fontWeight: 700,
    fontFamily: 'serif',
  },
  bottomButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20,
    gap:4
  },
  bottomButton: { 
    height:60, 
    flex: 1,
    justifyContent:'center',
    alignItems:'center', 
    paddingVertical: 5,
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
    fontSize: 17,
    fontWeight: 700,
    fontFamily: 'serif',
    color:BUTTON_COLOR,
    textAlign:'center',
    textAlignVertical:'center'
  },
  knowMoreAboutText:{
    fontSize: 20,
    fontFamily: 'serif',
    fontWeight: 700,
    color: TEXT_COLOR_2,
    marginVertical:5,
    textAlign:'center',
    borderWidth:1,
    paddingVertical:5,
    borderRightWidth:0,
    borderLeftWidth:0,
    borderColor: TEXT_COLOR_2
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