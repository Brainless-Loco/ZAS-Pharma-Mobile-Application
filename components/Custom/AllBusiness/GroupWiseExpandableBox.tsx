import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, CARD_HEADER_COLOR, INACTIVE_TAB_LABEL_COLOR, NESTED_CARD_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import { StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Linking } from 'react-native';

export default function GroupWiseExpandableBox() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <Pressable onPress={handleToggle} style={styles.boxContainer}>
        <View style={styles.TitleAndButtonContainer}>
            <View style={{width:'85%'}}>
                <Text style={{color:CARD_HEADER_COLOR, fontSize:23, fontWeight:'500'}}>Title</Text>
            </View>
            <Text style={{width:'15%', textAlign:'right'}}>
                {
                    isExpanded?
                    <AntDesign name="upcircle" size={24} color={INACTIVE_TAB_LABEL_COLOR} />:
                    <AntDesign name="downcircle" size={24} color={BUTTON_COLOR} />
                }

            </Text>
            
        </View>
        {isExpanded && (
          <View>
            <View style={styles.detailsBox}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbaR1ptnWsUX853xQpM5GmESS0ItfJJsc1Q&s' }} // Replace with your image URL
                style={styles.image}
              />
              <View style={styles.titleSloganAndLinkContainer}>
                  <Text style={styles.title}>Business Title</Text>
                  <Text style={styles.slogan}>Business Slogan Here</Text>
                  <TouchableOpacity
                      onPress={() => Linking.openURL('https://www.businesswebsite.com')} // Replace with the actual website
                      
                  >
                  <View style={styles.linkContainer}>
                      <Ionicons name="globe-sharp" size={20} color={BUTTON_COLOR} style={styles.link}/>
                      <Text style={{...styles.link, fontSize:13}}>Visit Website</Text>
                  </View>
                  
                  </TouchableOpacity>
              </View>
              
            </View>
            <View style={styles.detailsBox}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbaR1ptnWsUX853xQpM5GmESS0ItfJJsc1Q&s' }} // Replace with your image URL
                style={styles.image}
              />
              <View style={styles.titleSloganAndLinkContainer}>
                  <Text style={styles.title}>Business Title</Text>
                  <Text style={styles.slogan}>Business Slogan Here</Text>
                  <TouchableOpacity
                      onPress={() => Linking.openURL('https://www.businesswebsite.com')} // Replace with the actual website
                      
                  >
                  <View style={styles.linkContainer}>
                      <Ionicons name="globe-sharp" size={20} color={BUTTON_COLOR} style={styles.link}/>
                      <Text style={{...styles.link, fontSize:13}}>Visit Website</Text>
                  </View>
                  
                  </TouchableOpacity>
              </View>
              
            </View>
          </View>
        )}
      </Pressable>
    );
}


const styles = StyleSheet.create({
    boxContainer: {
      backgroundColor: CARD_BACKGROUND_COLOR,
      width:'97%',
      marginHorizontal:'auto',
      marginBottom: 15,
      padding: 9,
      paddingVertical: 20,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 6,
    },
    TitleAndButtonContainer:{
        display: 'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection: 'row',
        paddingHorizontal:10
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
      backgroundColor: NESTED_CARD_COLOR,
      borderRadius: 10,
      overflow:'hidden',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 6,
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      borderBottomLeftRadius:0,
      borderBottomRightRadius:0,
    },
    titleSloganAndLinkContainer:{
        paddingHorizontal:10,
        paddingVertical:10,
        textAlign:'left',
        width:'100%'
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: TEXT_COLOR
    },
    slogan: {
      fontSize: 13,
      color: TEXT_COLOR,
      marginBottom: 3,
    },
    linkContainer:{
        display:'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width:'100%',
        gap:5
    },
    link: {
      color: BUTTON_COLOR,
      width:'auto',
      fontWeight:'heavy'
    },
});