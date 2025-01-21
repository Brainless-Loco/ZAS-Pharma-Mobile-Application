import DynamicCheckboxGroup from '@/components/Custom/Feedback/DynamicCheckboxGroup';
import SubHeader from '@/components/Custom/SmallSubHeader/SubHeader';
import { BACKGROUND_COLOR, BUTTON_COLOR, CARD_BACKGROUND_COLOR, CLICKABLE_TEXT_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Feedback() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [productQuality, setProductQuality] = useState('');
  const [serviceExperience, setServiceExperience] = useState('');
  const [productReliability, setProductReliability] = useState('');
  const [deliverySatisfaction, setDeliverySatisfaction] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [comments, setComments] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const feedbackData = {
      name,
      contact,
      email,
      role,
      productQuality,
      serviceExperience,
      productReliability,
      deliverySatisfaction,
      suggestions,
      comments,
    };
  };
  if(loading){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color={CLICKABLE_TEXT_COLOR} />
        <Text style={styles.loadingText}>Submitting your valuable feedback...</Text>
      </View>
    )
  }
  if(submitted){
    return (
      <View style={styles.submittedContainer}>
        <MaterialCommunityIcons name="hand-okay" size={200} color={CLICKABLE_TEXT_COLOR} />
        <Text style={styles.submittedText}>Thanks for your feedback.</Text>
      </View>
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SubHeader text={"Your feedback is valuable in helping us to improve."} />
      <Text style={styles.header}>Please fill out the form below and Submit:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Name
          <Text style={styles.requiredAsterisk}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact No
          <Text style={styles.requiredAsterisk}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
          value={contact}
          onChangeText={setContact}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail Address
          <Text style={styles.requiredAsterisk}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <DynamicCheckboxGroup
        label="You are a:"
        options={['Doctor', 'Patient', 'Others']}
        required={true}
        selectedValue={role}
        onSelect={setRole}
      />
      <DynamicCheckboxGroup
        label="How would you rate the quality of our products?"
        options={['Excellent', 'Good', 'Poor']}
        required={true}
        selectedValue={productQuality}
        onSelect={setProductQuality}
      />
      <DynamicCheckboxGroup
        required={true}
        label="How would you rate your experience with our services?"
        options={['Excellent', 'Good', 'Poor']}
        selectedValue={serviceExperience}
        onSelect={setServiceExperience}
      />
      <DynamicCheckboxGroup
        label="How reliable are our products in meeting your needs?"
        options={['Reliable', 'Neutral', 'Unreliable']}
        required={true}
        selectedValue={productReliability}
        onSelect={setProductReliability}
      />
      <DynamicCheckboxGroup
        required={true}
        label="How satisfied are you with the delivery?"
        options={['Satisfied', 'Neutral', 'Dissatisfied']}
        selectedValue={deliverySatisfaction}
        onSelect={setDeliverySatisfaction}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Please provide any suggestions to help us improve our products and services:
        </Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="type here..."
          value={suggestions}
          onChangeText={setSuggestions}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Share any other Comments or Feedbacks:
        </Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="type here..."
          value={comments}
          onChangeText={setComments}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  loadingText:{
    color: CLICKABLE_TEXT_COLOR,
    fontWeight:'500',
    marginTop:10
  },
  submittedContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 15,
    paddingBottom: 100,
    backgroundColor: BACKGROUND_COLOR,
  },
  submittedText:{
    color: CLICKABLE_TEXT_COLOR,
    fontSize: 25,
    fontWeight:'800',
    marginTop:10
  },
  container: {
    paddingHorizontal: 15,
    backgroundColor: BACKGROUND_COLOR
  },
  header: {
    fontSize: 15,
    fontWeight: '800',
    color: TEXT_COLOR,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 0,
  },
  label: {
    fontSize: 13.5,
    lineHeight: 25,
    fontWeight: '500',
    color: TEXT_COLOR,
    marginBottom: 5,
    marginLeft: 4
  },
  requiredAsterisk: {
    color: 'red',
  },
  input: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '400',
    color: TEXT_COLOR,
    shadowColor: "#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
  },
  multilineInput: {
    minHeight: 80, // Adjust for more space
    textAlignVertical: 'top', // Align text at the top
  },
  submitButton: {
    width: '50%',
    marginHorizontal: 'auto',
    backgroundColor: BUTTON_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
    elevation: 10,
  },
  submitButtonText: {
    color: CARD_BACKGROUND_COLOR,
    fontSize: 18,
    fontWeight: '600',
  },
});
