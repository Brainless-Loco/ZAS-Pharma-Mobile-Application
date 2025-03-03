import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LabelInput from '@/components/Custom/DoseCalculator/LabelInput';
import Toggle from '@/components/Custom/DoseCalculator/Toggle';
import { BACKGROUND_COLOR, BUTTON_COLOR, TEXT_COLOR, TEXT_COLOR_2 } from '@/components/ui/CustomColor';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';


type RootStackParamList = {
  'RecommendedDosing': { loadingDose: number, maintenanceDose: number};
};

const Calculator = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('Cm');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [gender, setGender] = useState('Male');
  const [renalFunction, setRenalFunction] = useState('No Renal Replacement');
  const [creatinineState, setCreatinineState] = useState('Stable');
  const [creatinine, setCreatinine] = useState('');
  const [css_avg, setCss_avg] = useState('2.5');
  const [loadingDose, setLoadingDose] = useState(0);
  const [maintenanceDose, setMaintenanceDose] = useState(0);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  

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
    setCss_avg('');
  };

  // Auto-convert height on unit change
  useEffect(() => {
    if (height) {
      if (heightUnit === "Cm") {
        setHeight((parseFloat(height) * 2.54).toFixed(2)); // Convert inches to cm
      } else {
        setHeight((parseFloat(height) / 2.54).toFixed(2)); // Convert cm to inches
      }
    }
  }, [heightUnit]);

  // Auto-convert weight on unit change
  useEffect(() => {
    if (weight) {
      if (weightUnit === "kg") {
        setWeight((parseFloat(weight) / 2.20462).toFixed(2)); // Convert lbs to kg
      } else {
        setWeight((parseFloat(weight) * 2.20462).toFixed(2)); // Convert kg to lbs
      }
    }
  }, [weightUnit]);

  useEffect(() => {
    if (!age || !height || !weight) {
      setLoadingDose(0);
      setMaintenanceDose(0);
      return;
    }

    // Convert height to inches if in cm
    let heightInInches = heightUnit === "Cm" ? parseFloat(height) / 2.54 : parseFloat(height);

    // Calculate Ideal Body Weight (IBW)
    let idealBodyWeight = gender === "Male" 
      ? 50 + 2.3 * (heightInInches - heightInInches>=60 ? 60:0)
      : 45.5 + 2.3 * (heightInInches - heightInInches>=60 ? 60:0);

    // Convert weight to kg if in lbs
    let weightInKg = weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.453592;

    // Calculate creatinine clearance (CrCl)
    let CrCl;
    if (creatinineState === "Unstable") {
      CrCl = 1;
    } else if (creatinine) {
      let SCr = parseFloat(creatinine);
      CrCl = gender === "Male" 
        ? ((140 - parseFloat(age)) * weightInKg) / (72 * SCr) 
        : (((140 - parseFloat(age)) * weightInKg) / (72 * SCr)) * 0.85;
    } else {
      CrCl = 0;
    }

    // Calculate Loading Dose
    let calculatedLoadingDose = parseFloat(css_avg) * 2 * idealBodyWeight;
    if (calculatedLoadingDose > 900) calculatedLoadingDose = 900;
    
    // Calculate Maintenance Dose
    let calculatedMaintenanceDose = parseFloat(css_avg) * (1.5 * CrCl + 30);

    setLoadingDose(parseFloat(calculatedLoadingDose.toFixed(2)));
    setMaintenanceDose(parseFloat(calculatedMaintenanceDose.toFixed(2)));
  }, [age, height, heightUnit, weight, weightUnit, gender, creatinineState, creatinine]);


  const isCalculateDisabled =
    !age || !height || !weight || !gender || !renalFunction || (!creatinine && creatinineState === 'Stable') || !css_avg;

  const calculateFunction = ()=>{
    navigation.navigate('RecommendedDosing',{loadingDose,maintenanceDose});
    // console.log('clicked')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Patient Parameters</Text>

      <LabelInput disabled={false} unitToggle={""} label="Age" value={age} setValue={setAge} unit="Years" />
      <LabelInput disabled={false} unit="" label="Height" value={height} setValue={setHeight} unitToggle={{ options: ['Inch', 'Cm'], value: heightUnit, setValue: setHeightUnit }} />
      <LabelInput disabled={false} unit="" label="Weight" value={weight} setValue={setWeight} unitToggle={{ options: ['kg', 'lbs'], value: weightUnit, setValue: setWeightUnit }} />

      <Toggle label="Gender" options={['Male', 'Female']} value={gender} setValue={setGender} />

      <Text style={styles.sectionLabel}>Renal Function</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} selectedValue={renalFunction} onValueChange={(itemValue) => setRenalFunction(itemValue)}>
          <Picker.Item label="No Renal Replacement" value="No Renal Replacement" />
          {/* <Picker.Item label="Hemodialysis" value="Hemodialysis" />
          <Picker.Item label="Peritoneal Dialysis" value="Peritoneal Dialysis" />
          <Picker.Item label="Kidney Transplant" value="Kidney Transplant" /> */}
        </Picker>
      </View>
      <Toggle label="Creatinine State" options={['Stable', 'Unstable']} value={creatinineState} setValue={setCreatinineState} />

      {creatinineState === 'Stable' && <LabelInput disabled={false} unitToggle={""} label="Creatinine" value={creatinine} setValue={setCreatinine} unit="mg/dL" />}

      <Text style={styles.sectionLabel}>Therapeutic Goal</Text>
      <LabelInput disabled={true} unitToggle={""} label="Cₛₛ,ₐᵥ𝓰" value={css_avg} setValue={setCss_avg} unit="mg/L" />

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
    marginBottom: 10,
    fontFamily: 'serif',
  },
  sectionLabel: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20,
    color: TEXT_COLOR_2,
    fontFamily: 'serif',
    lineHeight: 21 
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
    fontWeight: 700,
    fontFamily: 'serif',

  },
  calculateBtnText:{
    color: '#fff',
    fontFamily: 'serif',
  }
});
