import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Text, View, StyleSheet } from 'react-native';
import HomeScreen from '@screens/Home';
import DealsScreen from '@screens/Deals';
import ChatScreen from '@screens/Chat';
import AccountScreen from '@screens/Account';
import LayoutScreen from '@components/core/FlightBooking/Layout';
import FlightShow from '@components/core/FlightBooking/ShowCard'

import { icons } from '@constants/index';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define props type for TabIcon component
type TabIconProps = {
  icon: any; // Define more specific type if possible
  color: string;
  focused: boolean;
};

// TabIcon component for rendering tab icons
const TabIcon: FC<TabIconProps> = ({ icon, color, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.iconImage, { tintColor: color }]} // Apply dynamic tint color
      />
    </View>
  );
};

// Tab Navigator Component
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar, // Custom styles for the tab bar
        tabBarLabelStyle: styles.tabLabel, // Styles for the label
        tabBarIconStyle: styles.tabIcon, // Center the icons
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.Home} color={color} focused={focused} />
          ),
          tabBarLabel: "Home", // Set the label for the tab
        }}
      />
      <Tab.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.Deals} color={color} focused={focused} />
          ),
          tabBarLabel: "Deals",
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.Chat} color={color} focused={focused} />
          ),
          tabBarLabel: "Chat",
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.Profile} color={color} focused={focused} />
          ),
          tabBarLabel: "Account",
        }}
      />
    </Tab.Navigator>
  );
};

// Main App component with Stack and Tab navigation
const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Main Tab Navigation */}
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        
        {/* Flight Book Layout, not part of tabs */}
        <Stack.Screen
          name="LayoutScreen"
          component={LayoutScreen}
          options={{
            title: 'Flight Booking',
            headerShown: true, // Set to false if you want to hide the header
          }}
        />

       <Stack.Screen
          name="FlightShow"
          component={FlightShow}
          options={{
            title: 'Flight Card',
            headerShown: true, // Set to false if you want to hide the header
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Stylesheet for consistent styling and better performance
const styles = StyleSheet.create({
  tabBar: {
    height: 70, // Increased height for the tab bar
    paddingBottom: 8,
    paddingTop: 5, // Padding to center the icons vertically
    backgroundColor: '#fff', // Change this to your desired background color
    borderTopWidth: 0, // Remove top border
    elevation: 2, // Add shadow effect (Android)
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 5, // Adjust margin to position the label
  },
  tabIcon: {
    alignSelf: 'center', // Center the icon
  },
});

export default App;
