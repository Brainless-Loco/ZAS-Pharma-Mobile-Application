import { StyleSheet,ScrollView, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import GroupWiseExpandableBox from '@/components/Custom/AllBusiness/GroupWiseExpandableBox';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default function AllBusiness() {

  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState([]);


  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'Other-Companies'));
      const companyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), // Spread the document fields
      }));
      setCompanies(companyData as any);
      setLoading(false)
    } catch (err) {
      console.error('Error fetching companies:', err);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  

  return (
    <ScrollView style={styles.container}>
        <SubHeader text={"We have five companies dedicated to healthcare."}/>
        {
          companies.length>0 && companies.map((company, index) => (
            <GroupWiseExpandableBox 
              key={index}
              company={company}
            />
          ))
        }
        {companies.length === 0 && <Text>No companies found.</Text>}
        {loading && <ActivityIndicator style={styles.loadingState} size={50} color={CLICKABLE_TEXT_COLOR} />}
        
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BACKGROUND_COLOR,
      padding:10,
      paddingTop:0
    },
    loadingState:{
      marginHorizontal:'auto',
    }
});