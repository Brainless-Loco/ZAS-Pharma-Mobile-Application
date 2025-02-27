import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';

export default function SingleActivity({activity}:{activity:any}) {
  const currentDate = 'JAN 20';

  return (
    <View style={styles.activityBox}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: activity.bannerUrl }}  // Replace with your image URL
          style={styles.image}
        />
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.title}>{activity.title}</Text>
      <View style={styles.socialLinksContainer}>
        <TouchableOpacity style={styles.socialLink} onPress={()=> Linking.openURL(activity.facebookLink)}>
          <AntDesign name="facebook-square" size={16} color={BUTTON_COLOR} />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLink}  onPress={()=> Linking.openURL(activity.linkedInLink)}>
          <AntDesign name="linkedin-square" size={16} color={BUTTON_COLOR} />
          <Text style={styles.socialText}>LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityBox: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingBottom: 15,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 130,
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: BUTTON_COLOR,
    borderRadius: 15,
    paddingHorizontal: 17,
    paddingVertical: 5.5,
  },
  dateText: {
    fontSize: 12,
    color: CARD_BACKGROUND_COLOR,
    fontFamily:'serif',
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    fontFamily:'serif',
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    paddingVertical: 12,
    borderRadius: 12,
    width:'47%',
    borderWidth:1.5,
    borderColor: BUTTON_COLOR
  },
  socialText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily:'serif',
    color: BUTTON_COLOR,
    fontWeight:'500',
  },
});
