import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import SingleProduct from './SingleProduct';
import { BUTTON_COLOR, CARD_BACKGROUND_COLOR } from '@/components/ui/CustomColor';

export default function ProductListWithLoadMoreBtn({ medicines }: { medicines: any[] }) {
    const [visibleMedicines, setVisibleMedicines] = useState(10);

    const loadMoreMedicines = () => {
        setVisibleMedicines(prevVisibleMedicines => prevVisibleMedicines + 10);
    };

    return (
        <View>
            {medicines.slice(0, visibleMedicines).map((product, index) => (
                <SingleProduct
                    isSearchItem={true}
                    key={index}
                    product={product}
                    isForDoseCalculation={false}
                />
            ))}
            {visibleMedicines < medicines.length && (
                <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreMedicines}>
                    <Text style={styles.loadMoreButtonText}>Load More</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loadMoreButton: {
        marginVertical: 20,
        width: '60%',
        marginHorizontal: 'auto',
        backgroundColor: BUTTON_COLOR,
        paddingVertical: 8,
        paddingHorizontal:5,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
          width: 3,
          height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 13,
        elevation: 10,
      },
      loadMoreButtonText: {
        color: CARD_BACKGROUND_COLOR,
        fontSize: 25,
        fontWeight: 700,
        fontFamily:'serif',
      },
});