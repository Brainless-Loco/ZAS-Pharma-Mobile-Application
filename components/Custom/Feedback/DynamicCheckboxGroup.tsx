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
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 0.5,
    color: TEXT_COLOR
  },
  required: {
    color: 'red',
  },
  optionsContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingLeft: 10
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  optionText: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight:'500'
  },
});
