import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'

export default function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={() => navigation.navigate('Search' as never)}>
        <Text>Go to Categories</Text>
      </Pressable>
    </View>
  )
}