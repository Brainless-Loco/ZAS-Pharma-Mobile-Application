import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
// import { useIsFocused } from '@react-navigation/native';
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import ExpandableDivisionBox from '@/components/Custom/Division/ExpandableDivisionBox';

export default function Divisions() {
  const [loading, setLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);

  // const isFocused = useIsFocused();

  const fetchDivisions = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'Divisions'));
        const divisionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), // Spread the document fields
        }));
        setDivisions([...divisionsData].sort((a:any, b:any) => a.title.localeCompare(b.title)) as any);
        setLoading(false)
      } catch (err) {
        console.error('Error fetching divisions:', err);
        setLoading(false)
      }
  };

  useEffect(() => {
    if (divisions.length<1) {
      fetchDivisions();
    }
  }, [
    // isFocused
    divisions
  ]);


  return (
    <ScrollView style={styles.container}>
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      }
      
      {!loading && divisions.map((division: { id: string; title: string; banners: any[] }, index) => {
        return <ExpandableDivisionBox 
          key={index}
          title={division.title}
          id={division.id}
          banners={division.banners? division.banners:[]}
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
    fontFamily: 'serif',
  },
});