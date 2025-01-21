import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import ExpandableDivisionBox from '@/components/Custom/Division/ExpandableDivisionBox';

const dummyDivisionsData = [
  {
    divisionTitle: 'Pain Relief',
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
    divisionTitle: 'Antibiotics',
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

export default function Divisions() {
  const [loading, setLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);

  const fetchDivisions = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'Divisions'));
        const divisionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), // Spread the document fields
        }));
        setDivisions(divisionsData as any);
        setLoading(false)
      } catch (err) {
        console.error('Error fetching divisions:', err);
        setLoading(false)
      }
    };
  
    useEffect(() => {
      fetchDivisions();
    }, []);
  
  const navigation = useNavigation();

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetails' as never);
  };




  return (
    <ScrollView style={styles.container}>
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      }
      
      {!loading && divisions.map((division: { id: string; title: string; products: any[] }, index) => {
        return <ExpandableDivisionBox 
          key={index}
          title={division.title}
          id={division.id}
          products={dummyDivisionsData[0].products}
        />
      })}
      <View style={{height:50}}></View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingVertical:15,
    paddingHorizontal:12,
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
});