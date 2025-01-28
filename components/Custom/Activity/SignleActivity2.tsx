import { View, Text, TouchableOpacity, Image, Linking, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome6  from '@expo/vector-icons/FontAwesome6';
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SignleActivity2({activity}:{activity:any}) {
  return (
    <View style={styles.activityBox}>
      {/* Left Section: Title and Image */}
      <View style={styles.activityInfo}>
        <Image source={{ uri: activity.bannerUrl }} style={styles.activityImage} />
        <Text style={styles.activityTitle}>{activity.title}</Text>
      </View>

      {/* Right Section: Social Media Links */}
      <View style={styles.socialLinks}>
        <TouchableOpacity onPress={() => Linking.openURL(activity.facebookLink)} style={styles.iconButton}>
          <AntDesign name="facebook-square" size={50} color={BUTTON_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(activity.linkedInLink)} style={styles.iconButton}>
          <AntDesign name="linkedin-square" size={50} color={BUTTON_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    activityBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      padding: 10,
      marginBottom: 16,
      marginHorizontal:12,
      backgroundColor: CARD_BACKGROUND_COLOR,
      shadowColor:"#000000",
      shadowOffset: {
        width: 3,
        height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 8,
    },
    activityInfo: {
      flex: 3, // 75% width
    },
    activityImage: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      marginBottom: 8,
      resizeMode: 'stretch',
    },
    activityTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: TEXT_COLOR_2,
      width:'100%',
    },
    socialLinks: {
      flex: 1, // 25% width
      alignItems: 'center',
      justifyContent: 'space-around',
      
    },
    iconButton: {
      marginVertical: 8,
    },
  });