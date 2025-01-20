import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { BACKGROUND_COLOR } from '@/components/ui/CustomColor';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import ResponsiblePersonsExpandableBox from '@/components/Custom/ResponsiblePersons/ResponsiblePersonsExpandableBox';

export default function ResponsiblePersons() {
    const dummyData = [
        {
          groupTitle: 'Management Team',
          persons: [
            {
              name: 'John Doe',
              rank: 'CEO',
              companyTitle: 'TechCorp Inc.',
              email: 'john.doe@techcorp.com',
              mobile: '123-456-7890',
            },
            {
              name: 'Jane Smith',
              rank: 'CFO',
              companyTitle: 'TechCorp Inc.',
              email: 'jane.smith@techcorp.com',
              mobile: '987-654-3210',
            },
          ],
        },
        {
          groupTitle: 'ZAS Critical Care Services ',
          persons: [
            {
              name: 'Alice Johnson',
              rank: 'Lead Engineer',
              companyTitle: 'Innovate Solutions',
              email: 'alice.johnson@innovate.com',
              mobile: '111-222-3333',
            },
            {
              name: 'Bob Brown',
              rank: 'Software Engineer',
              companyTitle: 'Innovate Solutions',
              email: 'bob.brown@innovate.com',
              mobile: '444-555-6666',
            },
          ],
        },
      ];
      
    return (
        <ScrollView style={styles.container}>
            <SubHeader text={"You are one call away to place an order. Please make a call to our responsible persons for every individual category."} />
            {dummyData.map((group, index) => (
                <ResponsiblePersonsExpandableBox 
                key={index}
                groupTitle={group.groupTitle}
                persons={group.persons}
                />
            ))}

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        padding: 5,
        paddingTop: 0
    },
});