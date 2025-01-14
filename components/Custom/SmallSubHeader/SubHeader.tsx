import React from 'react'
import { Text } from 'react-native'
import { BUTTON_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor'

export default function SubHeader({text}) {
  return (
    <Text style={{color: TEXT_COLOR_2, textAlign:'center',margin:0,padding:0, fontWeight:'500', fontSize:11, marginBottom:15}} >{text}</Text>
  )
}