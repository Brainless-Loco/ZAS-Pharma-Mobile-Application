import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BUTTON_COLOR, NESTED_CARD_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';

export default function SinglePerson(
    {name, rank, companyTitle, email, mobile }: 
    {name: string; rank: string; companyTitle: string; email: string; mobile: string;}
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
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${mobile}`)} style={styles.contactItem}>
          <Ionicons name="call" size={22} color={BUTTON_COLOR} />
          <Text style={styles.phoneText}>Call Now</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '500',
  },
  rankAndCompany: {
    color: TEXT_COLOR_2,
    fontSize: 13,
    fontWeight:'300',
    marginVertical: 4,
  },
  contactRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap:5
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    marginLeft: 8,
    color: BUTTON_COLOR,
    fontSize: 14,
    fontWeight:'500',
  },
  phoneText: {
    marginLeft: 8,
    color: BUTTON_COLOR,
    fontSize: 14,
    fontWeight:'500',
  },
});
