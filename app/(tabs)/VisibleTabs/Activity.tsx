import { StyleSheet,ScrollView, ActivityIndicator, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import SingleActivity from '@/components/Custom/Activity/SingleActivity';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useIsFocused } from '@react-navigation/native';
import SignleActivity2 from '@/components/Custom/Activity/SignleActivity2';

export default function Activity() {

  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(false)
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'Activities'));
        const activityData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as { date: string })
        }));
        activityData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setActivities(activityData as any);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
      setLoading(false)
    };

    if(isFocused) {
      setActivities([])
      fetchActivities();
    }
  }, [isFocused]);
  
  return (
    <ScrollView style={styles.container}>
        <SubHeader text={"For more details, tap on the social media icon."}/>
        {/* {
          activities.length > 0 && activities.map(
                (activity, index) =>
                      <SingleActivity key={index} activity={activity} />)
        } */}
        {
          activities.length>0 && 
            activities.map(
              (activity, index) =>
                  <SignleActivity2 activity={activity} key={index}/> 
          )
        }
        {!loading && activities.length === 0 && <Text>No activities found.</Text>}
        {loading && <ActivityIndicator style={styles.loadingState} size={50} color={CLICKABLE_TEXT_COLOR} />}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 5,
    paddingTop:0
  },
  loadingState:{
    marginHorizontal:'auto',
  }
});