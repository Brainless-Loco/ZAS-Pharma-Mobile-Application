import { StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import { BACKGROUND_COLOR } from '@/components/ui/CustomColor';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import SingleActivity from '@/components/Custom/Activity/SingleActivity';

export default function Activity() {
  return (
    <ScrollView style={styles.container}>
        <SubHeader text={"For more details, tap on the social media icon."}/>

        <SingleActivity/>
        
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
});