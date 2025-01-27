import { StyleSheet, ScrollView, View, ActivityIndicator, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import ResponsiblePersonsExpandableBox from '@/components/Custom/ResponsiblePersons/ResponsiblePersonsExpandableBox';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useIsFocused } from '@react-navigation/native';

export default function ResponsiblePersons({route}:{route:any}) {

    const {toBeExpandedDivisionId, toBeExpandedDivisionTitle} = route.params??{}

    const [loading, setLoading] = useState(false);
    const [divisions, setDivisions] = useState([]);

    
    const isFocused = useIsFocused();

    const dummyData = [
        {
          groupTitle: 'Management Team',
          persons: [
            {
              name: 'John Doe',
              rank: 'CEO',
              companyTitle: 'TechCorp Inc.',
              email: 'john.doe@techcorp.com',
              mobile: '123-456-7890',
            },
            {
              name: 'Jane Smith',
              rank: 'CFO',
              companyTitle: 'TechCorp Inc.',
              email: 'jane.smith@techcorp.com',
              mobile: '987-654-3210',
            },
          ],
        },
        {
          groupTitle: 'ZAS Critical Care Services ',
          persons: [
            {
              name: 'Alice Johnson',
              rank: 'Lead Engineer',
              companyTitle: 'Innovate Solutions',
              email: 'alice.johnson@innovate.com',
              mobile: '111-222-3333',
            },
            {
              name: 'Bob Brown',
              rank: 'Software Engineer',
              companyTitle: 'Innovate Solutions',
              email: 'bob.brown@innovate.com',
              mobile: '444-555-6666',
            },
          ],
        },
      ];
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
      if(isFocused){
        fetchDivisions();
      }
    }, [isFocused]);


    return (
        <ScrollView style={styles.container}>
            <SubHeader text={"You are one call away to place an order. Please make a call to our responsible persons for every individual category."} />
            {divisions.map((division: { id: string; title: string;}, index) => (
                <ResponsiblePersonsExpandableBox
                  id={division.id} 
                  key={index}
                  groupTitle={division.title}
                  toBeExpanded={division.id==toBeExpandedDivisionId && division.title == toBeExpandedDivisionTitle}
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
      marginTop:'50%'
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: CLICKABLE_TEXT_COLOR,
    },
});