import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, ScrollView, ActivityIndicator, Text, Pressable, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ExpandableCategoryBox from '@/components/Custom/Division/ExpandableDivisionBox';
import SingleProduct from '@/components/Custom/Product/SingleProduct';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import ProductListWithLoadMoreBtn from '@/components/Custom/Product/ProductListWithLoadMoreBtn';
// import { useIsFocused } from '@react-navigation/native';


export default function Search({ }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMedicineSearch, setIsMedicineSearch] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchedMedicines, setSearchedMedicines] = useState([])
  const [searchedDivisions, setSearchedDivisions] = useState([])

  // const isFocused = useIsFocused()

  const fetchMedicines = async () => {
    const productsRef = collection(db, `Products`);
    try {
      const medicineData = await getDocs(productsRef);
      const medicineList = medicineData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedicines([...medicineList].sort((a: any, b: any) => a.title.localeCompare(b.title)) as any);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
    }
  }

  const fetchDivisions = async () => {
    const divisionsRef = collection(db, 'Divisions');
    try {
      const divisionData = await getDocs(divisionsRef);
      const divisionList = divisionData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDivisions([...divisionList].sort((a: any, b: any) => a.title.localeCompare(b.title)) as any);
    } catch (error) {
      console.error('Error fetching divisions:', error);
    } finally {
    }
  }

  const onRefresh = async () => {
    if (isMedicineSearch) setMedicines([])
    else setDivisions([])
    if (isMedicineSearch) {
      fetchMedicines();
      fetchDivisions();
    }
    else {
      fetchDivisions();
      fetchMedicines();
    }
  };

  useEffect(() => {
    // if (isFocused) {
    if (medicines.length < 1 || divisions.length < 1) {
      setLoading(true)
      if (medicines.length < 1) fetchMedicines()
      if (divisions.length < 1) fetchDivisions()
      setLoading(false)
    }
    // }
  }, [
    // isFocused
    medicines,
    divisions
  ])

  useEffect(() => {
    if (searchQuery) {
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
    else {

    }
  }, [searchQuery])



  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={25} color="#666" style={styles.searchIcon} />
        <TextInput
          multiline={false}
          placeholder={isMedicineSearch ? "Search Medicines..." : "Search Divisions..."}
          value={searchQuery}
          style={styles.searchInput}
          onChangeText={(text: string) => { setSearchQuery(text) }}
        />
        {/* <TouchableOpacity onPress={toggleSearchType} style={styles.swapButton}>
          <Ionicons name="swap-horizontal" size={20} color="#fff" />
        </TouchableOpacity> */}
      </View>
      <View style={styles.tabGroup}>
        {/* Medicines Tab */}
        <Pressable onPress={() => setIsMedicineSearch(true)}
          style={[styles.tab, styles.leftTab, isMedicineSearch && styles.activeTab, isMedicineSearch && styles.activeTabLeftBorder]}>
          <Text style={[styles.tabText, isMedicineSearch && styles.activeTabText,]}>
            Medicines
          </Text>
        </Pressable>

        {/* Divisions Tab */}
        <Pressable onPress={() => setIsMedicineSearch(false)}
          style={[styles.tab, styles.rightTab, !isMedicineSearch && styles.activeTab, !isMedicineSearch && styles.activeTabRightBorder]}>
          <Text style={[styles.tabText, !isMedicineSearch && styles.activeTabText]}>
            Divisions
          </Text>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.searchItemsContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={BACKGROUND_COLOR}
          />
        }
      >
        {loading &&
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        }
        {!loading && !searchQuery && isMedicineSearch && medicines.length > 0 &&
          <ProductListWithLoadMoreBtn medicines={medicines}/>
        }


        {!loading && !searchQuery && !isMedicineSearch && divisions.length > 0 &&
          divisions.map((division: { title: string, id: string, banners: any[] }, index) => (
            <ExpandableCategoryBox
              key={index}
              title={division.title}
              banners={division.banners ? division.banners : []}
              id={division.id}
            />
          ))
        }

        {/* For Searching.... */}
        {
          searchQuery && !isMedicineSearch && searchedDivisions.length > 0 &&
          searchedDivisions.map((division: { title: string, id: string, banners: any[] }, index) => (
            <ExpandableCategoryBox
              banners={division.banners ? division.banners : []}
              key={index}
              title={division.title}
              id={division.id}
            />
          ))
        }
        {
          searchQuery && isMedicineSearch && searchedMedicines.length > 0 &&
          <ProductListWithLoadMoreBtn medicines={searchedMedicines}/>
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
    paddingVertical: 0
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 7,
    shadowColor: "#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
    margin: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
    opacity: 0.3
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: TEXT_COLOR,
    maxHeight: 50,
    fontFamily: 'serif',
  },
  tabGroup: {
    flexDirection: 'row',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: CARD_BACKGROUND_COLOR,
    width: '80%',
    marginHorizontal: 'auto',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND_COLOR,
  },
  activeTab: {
    backgroundColor: BUTTON_COLOR,
  },
  leftTab: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  rightTab: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  tabText: {
    fontSize: 17,
    color: TEXT_COLOR,
    fontFamily: 'serif',
  },
  activeTabText: {
    color: CARD_BACKGROUND_COLOR,
    fontWeight: 'bold',
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
    marginTop: '50%'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: CLICKABLE_TEXT_COLOR,
    fontFamily: 'serif',
  },
  searchItemsContainer: {
    marginHorizontal: 5
  },
  activeTabLeftBorder: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  activeTabRightBorder: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});