import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View, StyleSheet } from 'react-native';
import HomeScreen from '@screens/Home';
import DealsScreen from '@screens/Deals';
import ChatScreen from '@screens/Chat';
import BlogScreen from '@screens/Blog';
import AccountScreen from '@screens/Account';
import { icons } from '@constants/index';

const Tab = createBottomTabNavigator();

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

// Main App component
const App: FC = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

// Stylesheet for consistent styling and better performance
const styles = StyleSheet.create({
  tabBar: {
    height: 70, // Increased height for the tab bar
    paddingBottom: 8,
    paddingTop:5,// Padding to center the icons vertically
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
