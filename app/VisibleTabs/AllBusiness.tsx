import { View, Text, StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';
import { BACKGROUND_COLOR } from '@/components/ui/CustomColor';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import GroupWiseExpandableBox from '@/components/Custom/AllBusiness/GroupWiseExpandableBox';

export default function AllBusiness() {

  return (
    <ScrollView style={styles.container}>
        <SubHeader text={"We have five companies dedicated to healthcare."}/>
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
    boxContainer: {
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    toggleButton: {
      backgroundColor: '#373FAE',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    toggleText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
    detailsBox: {
      marginTop: 10,
      backgroundColor: '#DAE4F5',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    slogan: {
      fontSize: 14,
      color: '#555',
      marginBottom: 10,
    },
    link: {
      color: '#373FAE',
      fontSize: 16,
    },
});