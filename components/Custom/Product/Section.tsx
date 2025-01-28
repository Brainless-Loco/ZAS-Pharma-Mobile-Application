import { BACKGROUND_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, NESTED_CARD_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';
import React from 'react';
import { View, Text,  StyleSheet } from 'react-native';

const Section: React.FC<{ label: string; content: string | string[]; isList?: boolean }> = ({ label, content, isList }) => (
    <View style={styles.section}>
        <Text style={styles.label}>{label}</Text>
        {isList && Array.isArray(content)
            ? content.map((item: string, index: number) => <Text key={index} style={[styles.content, index!=content.length-1 && styles.conentWithNoBorderRadius]}>
                {/* <FontAwesome6 name="hand-point-right" size={12} color="black" />  */}
                {item}
            </Text>)
            : <Text style={[styles.content]}>{content}</Text>}
        
    </View>
);


export default Section;

const styles = StyleSheet.create({
    section: {
        marginBottom: 15,
        backgroundColor: NESTED_CARD_COLOR,
        shadowColor:"#000000",
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
    },
    label: {
        fontWeight: '600',
        // marginBottom: 5,
        fontSize: 25,
        color: CLICKABLE_TEXT_COLOR,
        backgroundColor: CARD_BACKGROUND_COLOR,
        paddingHorizontal:10,
        paddingVertical: 5,
        borderRadius: 5,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0
    },
    content: {
        fontSize: 18,
        fontWeight:'500',
        color: TEXT_COLOR_2,
        paddingLeft: 20,
        paddingRight:5,
        borderWidth:1,
        borderColor: CARD_BACKGROUND_COLOR,
        paddingVertical:5,
        borderRadius: 5,
        borderTopRightRadius:0,
        borderTopLeftRadius:0,
        
    },
    conentWithNoBorderRadius:{
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderBottomWidth:0
    }
});
