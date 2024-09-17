import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

const CustomLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <LinearGradient
      colors={[colorScheme === 'light' ? '#FCFCFE' : '#A3BFF3', colorScheme === 'light' ? '#A3BFF3' : '#FCFCFE']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default CustomLayout;
