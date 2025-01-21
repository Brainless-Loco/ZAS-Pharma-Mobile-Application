import { View, Text, Image, TouchableOpacity, Pressable,Linking,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, CARD_HEADER_COLOR, INACTIVE_TAB_LABEL_COLOR, NESTED_CARD_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GroupWiseExpandableBox({ company }: { company: any }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <Pressable onPress={handleToggle} style={styles.boxContainer}>
        <View style={styles.TitleAndButtonContainer}>
            <View style={{width:'85%'}}>
                <Text style={{color:CARD_HEADER_COLOR, fontSize:23, fontWeight:'500'}}>
                  {company.groupTitle??company.groupTitle}
                </Text>
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
                source={{ uri:company.logoURL??company.logoURL }} // Replace with your image URL
                style={styles.image}
              />
              <View style={styles.titleSloganAndLinkContainer}>
                  <Text style={styles.title}>{company.title??company.title}</Text>
                  <Text style={styles.slogan}>{company.slogan??company.slogan}</Text>
                  <TouchableOpacity
                      onPress={() => Linking.openURL(company.external_link??company.external_link)} // Replace with the actual website
                      
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
      paddingVertical: 25,
      borderRadius: 15,
      shadowColor:"#000000",
      shadowOffset: {
        width: 3,
        height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 13,
      elevation: 10,
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
      backgroundColor: CARD_BACKGROUND_COLOR
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
      lineHeight: 18,
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