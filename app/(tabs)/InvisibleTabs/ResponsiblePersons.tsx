import { StyleSheet, ScrollView, View, ActivityIndicator, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import ResponsiblePersonsExpandableBox from '@/components/Custom/ResponsiblePersons/ResponsiblePersonsExpandableBox';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useIsFocused } from '@react-navigation/native';

export default function ResponsiblePersons({ route }: { route: any }) {

  const { toBeExpandedDivisionId, toBeExpandedDivisionTitle } = route.params ?? {}


  const scrollViewRef = useRef<ScrollView>(null);

  const [loading, setLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);


  const isFocused = useIsFocused();

  const fetchDivisions = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'Divisions'));
      const divisionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), // Spread the document fields
      })).sort((a: any, b: any) => a.title.localeCompare(b.title));
      if (toBeExpandedDivisionId) {
        setDivisions([
          ...divisionsData.filter((div: { id: string }) => div.id === toBeExpandedDivisionId),
          ...divisionsData.filter((div: { id: string }) => div.id !== toBeExpandedDivisionId)
        ] as any); //sorting on the called division
      }
      else {
        setDivisions(divisionsData as any);
      }
      setLoading(false)
    } catch (err) {
      console.error('Error fetching divisions:', err);
      setLoading(false)
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchDivisions();
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [isFocused]);


  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <SubHeader text={"You are one call away to place an order. Please make a call to our responsible persons for every individual category."} />
      {divisions.map((division: { id: string; title: string; banners: any[] }, index) => (
        <ResponsiblePersonsExpandableBox
          id={division.id}
          banners={division.banners ? division.banners : []}
          key={index}
          groupTitle={division.title}
          toBeExpanded={division.id == toBeExpandedDivisionId && division.title == toBeExpandedDivisionTitle}
        />
      ))}
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      }

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 5,
    paddingTop: 0
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
});