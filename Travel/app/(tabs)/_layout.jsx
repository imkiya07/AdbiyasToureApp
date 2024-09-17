import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants/index";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }}
      />
      <Text
        style={{ color: color, fontWeight: focused ? '600' : '400', fontSize: 12 }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: true, // Show labels for the tabs
          tabBarLabelStyle: { fontSize: 12 }, // Optional: Customize the label style
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 10,
            borderTopColor: "#232533",
            height: 70,
            borderRadius:5
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="deals"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
