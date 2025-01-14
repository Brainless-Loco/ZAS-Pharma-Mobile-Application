import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BACKGROUND_COLOR, BUTTON_COLOR, INACTIVE_TAB_ICON_COLOR, INACTIVE_TAB_LABEL_COLOR } from '@/components/ui/CustomColor';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import DoseCalculator from './VisibleTabs/DoseCalculator';
import Activity from './VisibleTabs/Activity';
import Home from './VisibleTabs/Home';
import AllBusiness from './VisibleTabs/AllBusiness';
import Feedback from './VisibleTabs/Feedback';

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                  let size=18;
                  const iconColor = focused ? BUTTON_COLOR : INACTIVE_TAB_ICON_COLOR; // Active/Inactive icon color

                  if (route.name === 'Calculate Dose') {
                    return <MaterialCommunityIcons name="calculator-variant" size={size} color={iconColor} />
                  } else if (route.name === 'Activities') {
                    return <Ionicons name="document-text" size={size} color={iconColor} />
                  } else if (route.name === 'Home') {
                    return <Ionicons name="home" size={size} color={iconColor} /> 
                  } else if (route.name === 'All Businesses') {
                    return <MaterialCommunityIcons name="graph" size={size} color={iconColor} />
                  } else if (route.name === 'Feedback') {
                    return <Foundation name="comment-quotes" size={size} color={iconColor} />
                  }
                },
                tabBarLabelStyle: {
                  fontSize: 9,
                  fontWeight:'bold'
                },
                tabBarActiveTintColor: BUTTON_COLOR, // Active label color
                tabBarInactiveTintColor: INACTIVE_TAB_LABEL_COLOR, // Inactive label color
                tabBarStyle: {
                  height: 60,
                  backgroundColor: BACKGROUND_COLOR, // Background color for the tab bar
                },
              })}
            >

          <Tab.Screen name="Calculate Dose" component={DoseCalculator} />
          <Tab.Screen name="Activities" component={Activity} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="All Businesses" component={AllBusiness} />
          <Tab.Screen name="Feedback" component={Feedback} />
        </Tab.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
