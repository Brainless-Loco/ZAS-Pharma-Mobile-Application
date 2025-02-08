import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BUTTON_COLOR, NESTED_CARD_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';

export default function SinglePerson(
    {name, rank, companyTitle, email, mobiles }: 
    {name: string; rank: string; companyTitle: string; email: string; mobiles: string[];}
) {
  return (
    <View style={styles.personBox}>
      <Text style={styles.personName}>{name}</Text>
      <Text style={styles.rankAndCompany}>
        {rank} - {companyTitle}
      </Text>
      <View style={styles.contactRow}>
        {/* <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)} style={styles.contactItem}>
          <MaterialIcons name="email" size={22} color={BUTTON_COLOR} />
          <Text style={styles.emailText}>{email}</Text>
        </TouchableOpacity> */}
        {
          mobiles.map((mobile, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(`tel:${mobile}`)} style={styles.contactItem}>
              <Ionicons name="call" size={22} color={BUTTON_COLOR} />
              <Text style={styles.phoneText}>Call Now</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  personBox: {
    backgroundColor: NESTED_CARD_COLOR,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
    marginHorizontal: 7,
    marginBottom:12
  },
  personName: {
    color: BUTTON_COLOR,
    fontSize: 20,
    fontWeight: 700,
    fontFamily:'serif',
  },
  rankAndCompany: {
    color: TEXT_COLOR_2,
    fontSize: 16,
    fontWeight:'300',
    marginVertical: 4,
    fontFamily:'serif',
  },
  contactRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap:5
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:2,
    // width:'100%'
  },
  emailText: {
    marginLeft: 8,
    color: BUTTON_COLOR,
    fontSize: 16,
    fontWeight:'500',
    fontFamily:'serif',
  },
  phoneText: {
    marginLeft: 8,
    color: BUTTON_COLOR,
    fontSize: 16,
    fontWeight: 700,
    fontFamily:'serif',
  },
});
