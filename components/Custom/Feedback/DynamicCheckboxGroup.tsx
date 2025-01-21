import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CLICKABLE_TEXT_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';

export default function DynamicCheckboxGroup({ 
  label, 
  options, 
  required, 
  selectedValue, 
  onSelect 
}: {
  label: string;
  options: string[];
  required: boolean;
  selectedValue: string;
  onSelect: any;
}) {
  return (
    <View style={styles.groupContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onSelect(option)}
          >
            <Ionicons 
              name={selectedValue === option ? "checkbox" : "square-outline"} 
              size={20} 
              color={selectedValue === option ? CLICKABLE_TEXT_COLOR : TEXT_COLOR} 
            />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupContainer: {
    marginVertical: 7,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
    color: TEXT_COLOR
  },
  required: {
    color: 'red',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight:'500'
  },
});
