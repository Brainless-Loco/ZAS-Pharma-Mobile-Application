import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR, CARD_HEADER_COLOR, CLICKABLE_TEXT_COLOR, INACTIVE_TAB_LABEL_COLOR } from '@/components/ui/CustomColor';
import SinglePerson from './SinglePerson';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useIsFocused } from '@react-navigation/native';

export default function ResponsiblePersonsExpandableBox(
  { groupTitle, id, toBeExpanded, banners }: { groupTitle: string, id: string, toBeExpanded: boolean, banners: any[] }
) {

  const isFocused = useIsFocused()


  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responsiblePersons, setResponsiblePersons] = useState([]);


  const handleToggle = async () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded) {
      setLoading(true);

      try {
        const responsiblePersonsRef = collection(db, `Divisions/${id}/ResponsiblePersons`);
        const querySnapshot = await getDocs(responsiblePersonsRef);
        const personsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResponsiblePersons(personsData as any);
      } catch (error) {
        console.error('Error fetching responsible persons:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(false);
    setIsExpanded(false);
    setResponsiblePersons([])
  }, [isFocused])

  useEffect(() => {
    if (toBeExpanded) {
      handleToggle()
    }
  }, [toBeExpanded])

  return (
    <Pressable onPress={handleToggle} style={[styles.boxContainer, toBeExpanded && { borderColor: BUTTON_COLOR, borderWidth: 2, }]}>
      <View style={styles.TitleAndButtonContainer}>
        {banners.length > 0 ?
          <Image
            source={{ uri: banners[0] }}
            style={styles.banner}
            resizeMode="stretch"
          /> :

          <Text style={styles.groupTitle}>{groupTitle}</Text>

        }
        {/* <Text style={{ width: '15%', textAlign: 'right' }}>
          {isExpanded ? (
            <AntDesign name="upcircle" size={24} color={INACTIVE_TAB_LABEL_COLOR} />
          ) : (
            <AntDesign name="downcircle" size={24} color={BUTTON_COLOR} />
          )}
        </Text> */}
      </View>
      {loading && isExpanded &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CLICKABLE_TEXT_COLOR} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      }
      {!loading && isExpanded && responsiblePersons.length == 0 &&
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No responsible persons found for this division.</Text>
        </View>
      }
      {isExpanded && (
        <View style={styles.personContainer}>
          {responsiblePersons.map(({ name, rank, company, email, mobiles }: { name: string, rank: string, company: string, email: string, mobiles: string[] }, index) => (
            <SinglePerson
              key={index}
              name={name}
              rank={rank}
              companyTitle={company}
              email={email}
              mobiles={mobiles}
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
    width: 330,
    marginHorizontal: 'auto',
    marginBottom: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: "#000000",
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
    justifyContent: 'center',
    width: 315,
    borderRadius: 10,
    backgroundColor: CARD_BACKGROUND_COLOR,
    height: 135,
  },
  banner: {
    width: '100%',
    height: '100%',
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 10,
  },
  groupTitle: {
    color: CARD_HEADER_COLOR,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 700,
    fontFamily: 'serif',
  },
  personContainer: {
    marginTop: 20,
    width: '100%'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'serif',
    color: CLICKABLE_TEXT_COLOR,
  },
});
