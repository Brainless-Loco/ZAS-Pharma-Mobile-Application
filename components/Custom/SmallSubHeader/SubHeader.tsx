import React from 'react'
import { Text } from 'react-native'
import { TEXT_COLOR_2 } from '@/components/ui/CustomColor'

export default function SubHeader({text}:{text:string}) {
  return (
    <Text style={{color: TEXT_COLOR_2, textAlign:'center',margin:0,padding:0, fontWeight:'500', fontSize:18, marginBottom:15, fontFamily:''}} >{text}</Text>
  )
}