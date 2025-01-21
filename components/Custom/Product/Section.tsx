import { CLICKABLE_TEXT_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Section: React.FC<{ label: string; content: string | string[]; isList?: boolean }> = ({ label, content, isList }) => (
    <View style={styles.section}>
        <Text style={styles.label}>{label}</Text>
        {isList && Array.isArray(content)
            ? content.map((item: string, index: number) => <Text key={index} style={styles.text}>{item}</Text>)
            : <Text style={styles.text}>{content}</Text>}
        
    </View>
);


export default Section;

const styles = StyleSheet.create({
    section: {
        marginBottom: 15
    },
    label: {
        fontWeight: '600',
        marginBottom: 5,
        fontSize: 21,
        color: CLICKABLE_TEXT_COLOR
    },
    text: {
        fontSize: 14,
        fontWeight:'500',
        color: TEXT_COLOR_2,
        marginBottom: 5,
        marginLeft: 20
    },
});
