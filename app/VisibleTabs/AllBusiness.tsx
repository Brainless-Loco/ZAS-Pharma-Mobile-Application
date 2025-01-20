import { StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import { BACKGROUND_COLOR } from '@/components/ui/CustomColor';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import GroupWiseExpandableBox from '@/components/Custom/AllBusiness/GroupWiseExpandableBox';

export default function AllBusiness() {

  return (
    <ScrollView style={styles.container}>
        <SubHeader text={"We have five companies dedicated to healthcare."}/>
        <GroupWiseExpandableBox/>
        <GroupWiseExpandableBox/>
        <GroupWiseExpandableBox/>
        
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
});