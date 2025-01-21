import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, CARD_HEADER_COLOR, INACTIVE_TAB_LABEL_COLOR } from '@/components/ui/CustomColor';
import SinglePerson from './SinglePerson';

export default function ResponsiblePersonsExpandableBox(
    { groupTitle, persons }:{groupTitle: string, persons: any[]}
) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Pressable onPress={handleToggle} style={styles.boxContainer}>
      <View style={styles.TitleAndButtonContainer}>
        <View style={{ width: '85%' }}>
          <Text style={styles.groupTitle}>{groupTitle}</Text>
        </View>
        <Text style={{ width: '15%', textAlign: 'right' }}>
          {isExpanded ? (
            <AntDesign name="upcircle" size={24} color={INACTIVE_TAB_LABEL_COLOR} />
          ) : (
            <AntDesign name="downcircle" size={24} color={BUTTON_COLOR} />
          )}
        </Text>
      </View>
      {isExpanded && (
        <View style={styles.personContainer}>
          {persons.map((person, index) => (
            <SinglePerson 
              key={index} 
              name={person.name} 
              rank={person.rank} 
              companyTitle={person.companyTitle} 
              email={person.email} 
              mobile={person.mobile} 
            />
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    width: '97%',
    marginHorizontal: 'auto',
    marginBottom: 15,
    paddingHorizontal: 15,
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
  TitleAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupTitle: {
    color: CARD_HEADER_COLOR,
    fontSize: 22,
    fontWeight: '500',
  },
  personContainer: {
    marginTop: 20,
  },
});
