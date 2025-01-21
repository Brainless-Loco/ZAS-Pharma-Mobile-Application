import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BACKGROUND_COLOR, BUTTON_COLOR, INACTIVE_TAB_ICON_COLOR, INACTIVE_TAB_LABEL_COLOR, TEXT_COLOR } from '@/components/ui/CustomColor';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import { StyleSheet } from 'react-native';
import HeaderLeft from '@/components/Custom/Header/HeaderLeft';
import DoseCalculator from './VisibleTabs/DoseCalculator';
import Activity from './VisibleTabs/Activity';
import Home from './VisibleTabs/Home';
import AllBusiness from './VisibleTabs/AllBusiness';
import Feedback from './VisibleTabs/Feedback';
import Categories from './InvisibleTabs/Divisions';
import Search from './InvisibleTabs/Search';
import ProductDetails from './InvisibleTabs/ProductDetails';
import ResponsiblePersons from './InvisibleTabs/ResponsiblePersons';

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                  let size=25;
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
                animation:'shift'
              })}
            >
          {/* Visible Tabs */}
          <Tab.Screen name="Calculate Dose"
            options={{
              headerTitle: 'Dose Calculator',
              headerTitleAlign: 'center',
              headerLeft: () => (
              <HeaderLeft/>
              ),
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: styles.headerStyle
            }}
            component={DoseCalculator} />
          <Tab.Screen name="Activities" 
            options={{
              headerTitle: 'Our Latest Activities',
              headerTitleAlign: 'center',
              headerLeft: () => (
              <HeaderLeft/>
              ),
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: styles.headerStyle
            }}
            component={Activity} />
          <Tab.Screen name="Home" 
            options={{
              headerShown:false
            }}
            component={Home} />
          <Tab.Screen name="All Businesses"
            options={{
              headerTitle: 'Our All Businesses',
              headerTitleAlign: 'center',
              headerLeft: () => (
              <HeaderLeft/>
              ),
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: styles.headerStyle
            }}
            component={AllBusiness} />
          <Tab.Screen name="Feedback" 
              options={{
                headerTitle: 'Send Your Feedback',
                headerTitleAlign: 'center',
                headerLeft: () => (
                <HeaderLeft/>
                ),
                headerTitleStyle: styles.headerTitleStyle,
                headerStyle: styles.headerStyle
              }}
              component={Feedback} />

            {/* Invisible Tabs */}
            <Tab.Screen name="Categories"
                component={Categories}
                options={{
                    tabBarItemStyle:{display:'none'},
                    headerTitle: 'Categories',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                    <HeaderLeft/>
                    ),
                    headerTitleStyle: styles.headerTitleStyle,
                    headerStyle: styles.headerStyle
                }}
            />

            <Tab.Screen name="Search"
                component={Search}
                options={{
                    tabBarItemStyle:{display:'none'},
                    headerTitle: 'Search',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                    <HeaderLeft/>
                    ),
                    headerTitleStyle: styles.headerTitleStyle,
                    headerStyle: styles.headerStyle
                }}
            />
            <Tab.Screen name="ProductDetails"
                component={ProductDetails}
                options={{
                    tabBarItemStyle:{display:'none'},
                    headerTitle: 'Details',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                    <HeaderLeft/>
                    ),
                    headerTitleStyle: styles.headerTitleStyle,
                    headerStyle: styles.headerStyle
                }}
            />

            <Tab.Screen name="ResponsiblePersons"
                component={ResponsiblePersons}
                options={{
                    tabBarItemStyle:{display:'none'},
                    headerTitle: 'Responsible Persons',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                    <HeaderLeft/>
                    ),
                    headerTitleStyle: styles.headerTitleStyle,
                    headerStyle: styles.headerStyle
                }}
            />

        </Tab.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  headerStyle:{
    backgroundColor: BACKGROUND_COLOR,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    height:40
  }
})
