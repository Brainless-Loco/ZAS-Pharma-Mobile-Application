import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';

export default function Categories() {
    
    const navigation = useNavigation();

    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: 'none'
          }
        });
        return () => {
          navigation.getParent()?.setOptions({
            tabBarStyle: {
              display: 'flex'
            }
          });
        }
      }, [])

    return (
        <View>
        <Text>Categoriesssssss</Text>
        </View>
    )
}