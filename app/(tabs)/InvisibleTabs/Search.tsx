import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import React, { useEffect, useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Text  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ExpandableCategoryBox from '@/components/Custom/Division/ExpandableDivisionBox';
import { useNavigation } from 'expo-router';
import SingleProduct from '@/components/Custom/Product/SingleProduct';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useIsFocused } from '@react-navigation/native';

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

export default function Search({}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMedicineSearch, setIsMedicineSearch] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchedMedicines, setSearchedMedicines] = useState([])
  const [searchedDivisions, setSearchedDivisions] = useState([])

  const isFocused = useIsFocused()

  const toggleSearchType = () => {
    setIsMedicineSearch(!isMedicineSearch);
  };

  
  const fetchMedicines = async ()=>{
    setLoading(true);
    const productsRef = collection(db, `Products`);
    try {
      const medicineData = await getDocs(productsRef);
      const medicineList = medicineData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedicines(medicineList as any);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchDivisions = async () =>{
    setLoading(true);
    const divisionsRef = collection(db, 'Divisions');
    try {
      const divisionData = await getDocs(divisionsRef);
      const divisionList = divisionData.docs.map((doc) => ({
        id: doc.id,
       ...doc.data(),
      }));
      setDivisions(divisionList as any);
    } catch (error) {
      console.error('Error fetching divisions:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(isFocused){
      fetchMedicines()
      fetchDivisions()
    }
  }, [isFocused])

  useEffect(()=>{
    if(searchQuery){
      const filteredMedicines = medicines.filter((medicine: any) => {
        const query = searchQuery.toLowerCase();
      
        return (
          medicine.title?.toLowerCase().includes(query) ||
          medicine.generic_name?.toLowerCase().includes(query) ||
          medicine.origin?.toLowerCase().includes(query) ||
          medicine.manufacturer_info?.name?.toLowerCase().includes(query) ||
          medicine.side_effects?.some((effect: string) => effect.toLowerCase().includes(query)) ||
          medicine.indications?.some((indication: string) => indication.toLowerCase().includes(query)) ||
          medicine.dosing_information?.some((info: string) => info.toLowerCase().includes(query)) ||
          medicine.available_strength?.some((strength: any) => 
            strength.option_title?.toLowerCase().includes(query) || 
            strength.package_size?.toLowerCase().includes(query) || 
            strength.price?.toLowerCase().includes(query) || 
            strength.dosage_form?.toLowerCase().includes(query)
          )
        );
      });      
      setSearchedMedicines(filteredMedicines);
      const filteredDivisions = divisions.filter((division: any) => {
        const query = searchQuery.toLowerCase();
        return (
          division.title?.toLowerCase().includes(query) ||
          division.description?.toLowerCase().includes(query)
        );
      });      
      setSearchedDivisions(filteredDivisions);
    }
    else{
      
    }
  },[searchQuery])

  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#666" style={styles.searchIcon} />
        <TextInput
          placeholder={isMedicineSearch ? "Search Medicines..." : "Search Divisions..."}
          value={searchQuery}
          style={styles.searchInput}
          onChangeText={(text:string)=>{setSearchQuery(text)}}
        />
        <TouchableOpacity onPress={toggleSearchType} style={styles.swapButton}>
          <Ionicons name="swap-horizontal" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.searchItemsContainer}>
        {loading &&
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        }
        {!loading && !searchQuery && !isMedicineSearch && divisions.length>0 &&
              divisions.map((division:{title:string, id:string}, index) => (
                <ExpandableCategoryBox 
                  key={index}
                  title={division.title}
                  id={division.id}
                />
              ))
            }

          {/* For Searching.... */}
          {
              searchQuery && !isMedicineSearch && searchedDivisions.length>0 && 
              searchedDivisions.map((division:{title:string, id:string}, index) => (
                  <ExpandableCategoryBox 
                    key={index}
                    title={division.title}
                    id={division.id}
                  />
                ))
            }
            {!loading && !searchQuery && isMedicineSearch && medicines.length>0 && 
                medicines.map((product, index) => (
                    <SingleProduct
                      isSearchItem={true} 
                      key={index}
                      product={product}
                    />
                ))
            }
            {
              searchQuery && isMedicineSearch && searchedMedicines.length>0 && 
                searchedMedicines.map((product, index) => (
                  <SingleProduct
                    isSearchItem={true} 
                    key={index}
                    product={product}
                  />
              ))
            }

            
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 5,
    paddingVertical:0
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 15,
    paddingHorizontal: 10,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
    margin: 10,
    marginBottom:10,
  },
  searchIcon: {
    marginRight: 10,
    opacity:0.3
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: TEXT_COLOR,
  },
  swapButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BUTTON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
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
  searchItemsContainer: {
    marginHorizontal: 5
  }
});