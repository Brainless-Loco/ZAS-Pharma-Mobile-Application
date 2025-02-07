import { BUTTON_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const LabelInput = ({ label, value, setValue, unit, unitToggle }:{label:string, value:string, setValue:any, unit:any, unitToggle:any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={value} onChangeText={setValue} keyboardType="numeric" />
        {unitToggle ? (
          <View style={styles.toggleContainer}>
            {unitToggle.options.map((option:string, idx:number) => (
              <TouchableOpacity key={option} style={[styles.toggleButton, unitToggle.value === option && styles.activeToggle, idx===0? styles.leftRadius:styles.rightRadius, unitToggle.value === option && (idx===0? styles.rightRadius :styles.leftRadius) ]} onPress={() => unitToggle.setValue(option)}>
                <Text style={unitToggle.value === option ? styles.activeToggleText:styles.inActiveToggleText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.unit}>{unit}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginVertical: 10 
},
  label: { 
    fontSize: 18,
    fontWeight:600, 
    marginBottom: 5 
},
  inputContainer: {
    borderRadius: 15,
    paddingHorizontal:5,
    display:'flex',
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
},
  input: { 
    width:'55%',
    fontSize: 16,
    paddingHorizontal:10,
    fontWeight:500,
    color:TEXT_COLOR,
    height: 60,
    backgroundColor:'#fff',
    borderRadius:13,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
},
  unit: { 
    fontSize: 16,
    height: 50,
    fontWeight:600,
    marginLeft: 10,
    width:'35%',
    textAlign:'center',
    textAlignVertical:'center'
},
  toggleContainer: {
    backgroundColor:'#fff',
    borderRadius:35,
    flexDirection: 'row',
    height: 50,
    width:'42%',
    alignItems:'center',
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 5,
},
  toggleButton: {
    width:'50%',
    height:'100%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
},
  activeToggle: { 
    backgroundColor: BUTTON_COLOR 
},
activeToggleText:{
    color: 'white', 
    fontSize: 18,
    fontWeight:600
},
  inActiveToggleText: { 
    color: BUTTON_COLOR,
    fontSize: 18,
    fontWeight:600 
},
  leftRadius: {
    borderTopLeftRadius:35,
    borderBottomLeftRadius:35
  },
  rightRadius:{
    borderTopRightRadius:35,
    borderBottomRightRadius:35
  }
});

export default LabelInput;
