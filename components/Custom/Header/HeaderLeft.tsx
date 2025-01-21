import { TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { BUTTON_COLOR } from '@/components/ui/CustomColor';

export default function HeaderLeft() {
    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
        <Ionicons name="chevron-back" size={35} color={BUTTON_COLOR} />
    </TouchableOpacity>
  )
}