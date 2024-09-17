import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});
const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">AdbiyasToure</Text>
      <Link href="/Home" style={{ color: "blue", marginTop: 20 }}>
        Go to Home
      </Link>
      <StatusBar style="auto" />
    </View>
  );
};

export default Index;
