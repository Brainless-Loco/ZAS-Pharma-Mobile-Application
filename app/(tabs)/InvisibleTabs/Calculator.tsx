import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR } from '@/components/ui/CustomColor';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  'RecommendedDosing': { product: any }
};

export default function Calculator({route}:{route:any}) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const {product} = route.params??{}

    return (
        <ScrollView style={styles.container}>
        <Text>Calculator</Text>
        <Pressable onPress={()=>{navigation.navigate('RecommendedDosing',{product:product})}}>
            <Text> RecommendedDosing for {product.title}</Text>
        </Pressable>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal:12,
    paddingTop:12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'50%'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: CLICKABLE_TEXT_COLOR,
  },
});