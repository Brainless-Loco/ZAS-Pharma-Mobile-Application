import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    'Dose Calculator For A Product': { product: object }
};
export default function RecommendedDosing({ route }: { route: any }) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const { product,loadingDose,maintenanceDose } = route.params ?? {};

    return (
        <ScrollView style={styles.container}>
            {/* Loading Dose Section */}
            <View style={styles.section}>
                <Text style={styles.title}>Loading Dose:</Text>
                <View style={styles.box}>
                    <Text style={styles.quantity}>{loadingDose}</Text>
                    <Text style={styles.unit}>CBA</Text>
                </View>
            </View>

            {/* Maintaining Dose Section */}
            <View style={styles.section}>
                <Text style={styles.title}>Maintainance Dose:</Text>
                <View style={styles.box}>
                    <Text style={styles.quantity}>{maintenanceDose}</Text>
                    <Text style={styles.unit}>CBA</Text>
                </View>
                {/* <Text style={styles.orText}>Or</Text>
                <View style={styles.box}>
                    <Text style={styles.quantity}>75</Text>
                    <Text style={styles.unit}>mg CBA IV Q12hr</Text>
                </View> */}
            </View>

            {/* Calculate Again Button */}
            <Pressable style={styles.button} onPress={()=>{navigation.navigate('Dose Calculator For A Product',{product})}}>
                <Text style={styles.buttonText}>Calculate again</Text>
            </Pressable>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: BACKGROUND_COLOR,
        paddingHorizontal: 20,
        paddingTop: 20,
        height: '100%'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: CLICKABLE_TEXT_COLOR,
        fontFamily:'serif',
    },
    section: {
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        color: TEXT_COLOR,
        fontWeight: '700',
        marginBottom: 8,
        fontFamily:'serif',
    },
    box: {
        width: '92%',
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CARD_BACKGROUND_COLOR,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        padding: 12,
        marginBottom: 8,
        gap: 8
    },
    quantity: {
        fontSize: 50,
        fontWeight: 700,
        color: BUTTON_COLOR,
        fontFamily:'serif',
    },
    unit: {
        fontSize: 22,
        color: TEXT_COLOR,
        fontWeight: 700,
        marginLeft: 8,
        fontFamily:'serif',
    },
    orText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginVertical: 8,
        fontFamily:'serif',
    },
    button: {
        alignSelf: 'center',
        backgroundColor: CARD_BACKGROUND_COLOR,
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginTop: 50,
        width: '65%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: BUTTON_COLOR,
        fontSize: 20,
        fontWeight: 700,
        fontFamily:'serif',
    },
});