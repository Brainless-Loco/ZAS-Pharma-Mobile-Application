import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LabelInput from '@/components/Custom/DoseCalculator/LabelInput';
import Toggle from '@/components/Custom/DoseCalculator/Toggle';
import { BACKGROUND_COLOR, BUTTON_COLOR, TEXT_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';
import { useNavigation } from 'expo-router';

const Calculator = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('Cm');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [gender, setGender] = useState('');
  const [renalFunction, setRenalFunction] = useState('');
  const [creatinineState, setCreatinineState] = useState('Stable');
  const [creatinine, setCreatinine] = useState('');
  const [targetCss, setTargetCss] = useState('');

  const navigation = useNavigation()

  const resetFields = () => {
    setAge('');
    setHeight('');
    setHeightUnit('Cm');
    setWeight('');
    setWeightUnit('kg');
    setGender('Male');
    setRenalFunction('');
    setCreatinineState('Stable');
    setCreatinine('');
    setTargetCss('');
  };


  const isCalculateDisabled =
    !age || !height || !weight || !gender || !renalFunction || (!creatinine && creatinineState === 'Stable') || !targetCss;

  const calculateFunction = ()=>{
    navigation.navigate('RecommendedDosing' as never);
    // console.log('clicked')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Patient Parameters</Text>

      <LabelInput unitToggle={""} label="Age" value={age} setValue={setAge} unit="Years" />
      <LabelInput unit="" label="Height" value={height} setValue={setHeight} unitToggle={{ options: ['Inch', 'Cm'], value: heightUnit, setValue: setHeightUnit }} />
      <LabelInput unit="" label="Weight" value={weight} setValue={setWeight} unitToggle={{ options: ['kg', 'lbs'], value: weightUnit, setValue: setWeightUnit }} />

      <Toggle label="Gender" options={['Male', 'Female']} value={gender} setValue={setGender} />

      <Text style={styles.sectionLabel}>Renal Function</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={renalFunction} onValueChange={(itemValue) => setRenalFunction(itemValue)}>
          <Picker.Item label="Not on Renal Replacement" value="Not on Renal Replacement" />
          <Picker.Item label="Hemodialysis" value="Hemodialysis" />
          <Picker.Item label="Peritoneal Dialysis" value="Peritoneal Dialysis" />
          <Picker.Item label="Kidney Transplant" value="Kidney Transplant" />
        </Picker>
      </View>
      <Toggle label="Creatinine State" options={['Stable', 'Unstable']} value={creatinineState} setValue={setCreatinineState} />

      {creatinineState === 'Stable' && <LabelInput unitToggle={""} label="Creatinine" value={creatinine} setValue={setCreatinine} unit="mg/dL" />}

      <Text style={styles.sectionLabel}>Therapeutic Goal</Text>
      <LabelInput unitToggle={""} label="Cₛₛ,ₐᵥ𝓰 Target" value={targetCss} setValue={setTargetCss} unit="mg/L" />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.calculateButton, isCalculateDisabled && styles.disabledButton]} 
        // disabled={isCalculateDisabled} 
        onPress={calculateFunction}>
          <Text style={[styles.buttonText, styles.calculateBtnText]}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 20,
    backgroundColor: BACKGROUND_COLOR 

  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold',
    color: TEXT_COLOR, 
    marginBottom: 10 
  },
  sectionLabel: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20,
    color: TEXT_COLOR_2, 
  },
  pickerContainer: {
    borderRadius: 15,  // Rounded corners
    overflow: 'hidden', // Ensures the borderRadius is applied
    backgroundColor: '#fff', 
    marginVertical: 10,
  },
  picker: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    marginVertical: 10,

  },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20,
    marginBottom: 25,

  },
  resetButton: { 
    width: '48%', 
    padding: 15, 
    borderRadius: 40, 
    backgroundColor: '#fff',
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 5,
  },
  calculateButton: { 
    width: '48%', 
    padding: 15, 
    borderRadius: 40, 
    backgroundColor: BUTTON_COLOR,
    shadowColor:"#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 5,

  },
  disabledButton: { 
    opacity: 0.5
  },
  buttonText: { 
    color: BUTTON_COLOR, 
    textAlign: 'center', 
    fontSize: 20,
    fontWeight: 600

  },
  calculateBtnText:{
    color: '#fff',
  }
});
