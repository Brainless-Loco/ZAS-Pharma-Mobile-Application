import { BUTTON_COLOR, TEXT_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Toggle = ({ label, options, value, setValue }: { label: string, options: any, value: string, setValue: any }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.toggleContainer}>
                {options.map((option: any, idx: number) => (
                    <TouchableOpacity key={option} style={[styles.toggleButton, value === option && styles.activeToggle, value === option && idx === 0 ? styles.rightRadius : styles.leftRadius]} onPress={() => setValue(option)}>
                        <Text style={[value === option ? styles.activeToggleText : styles.inActiveToggleText, styles.toggleText,]}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    label: {
        fontSize: 20,
        fontFamily:'serif',
        fontWeight: 700,
        color: TEXT_COLOR_2,
        marginBottom: 5
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: '8%',
        justifyContent: 'center',
        borderRadius: 40,
        overflow: 'hidden',
        height: 60,
        shadowColor: "#000000",
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 13,
        elevation: 15,
    },
    toggleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    activeToggle: {
        backgroundColor: BUTTON_COLOR,
    },
    toggleText: {
        fontSize: 20,
        fontFamily:'serif',
        fontWeight: 700
    },
    activeToggleText: {
        color: 'white',
    },
    inActiveToggleText: {
        color: BUTTON_COLOR,
    },
    leftRadius: {
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35
    },
    rightRadius: {
        borderTopRightRadius: 35,
        borderBottomRightRadius: 35
    }
});

export default Toggle;
