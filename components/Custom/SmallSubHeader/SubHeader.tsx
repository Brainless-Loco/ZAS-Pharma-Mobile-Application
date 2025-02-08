import React from 'react'
import { Text } from 'react-native'
import { TEXT_COLOR_2 } from '@/components/ui/CustomColor'
import { StyleSheet } from 'react-native'

export default function SubHeader({text}:{text:string}) {
  return (
    <Text style={styles.subHeader} >{text}</Text>
  )
}

const styles = StyleSheet.create({
  subHeader: {
    color: TEXT_COLOR_2, 
    textAlign:'center',
    margin:0,
    paddingHorizontal:5,
    paddingVertical:2,
    fontWeight:'500', 
    fontSize:18,
    marginBottom:15,
    fontFamily:'serif',
    lineHeight:18
  },
})