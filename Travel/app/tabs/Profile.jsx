import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';

const ProfileScreen = () => {
  // Dummy user data (replace with actual data or state management)
  const userData = {
    username: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8901',
    profileImage: require('@/assets/images/profile.jpg'), // Example path, replace with actual image source
  };

  return (
    <LinearGradient colors={['#A3BFF3', '#FCFCFE']} style={styles.container}>
      {/* Profile Image Section */}
      <View style={styles.profileImageContainer}>
        <Image source={userData.profileImage} style={styles.profileImage} />
        <ThemedText style={styles.greeting}>Hello Guest</ThemedText>
      </View>

      {/* Log in Button */}
      <TouchableOpacity style={styles.loginButton}>
        <ThemedText style={styles.loginButtonText}>Log in</ThemedText>
      </TouchableOpacity>

      {/* Settings and Support Section */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsButton}>
          <ThemedText style={styles.settingsButtonText}>
            Terms and condition
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <ThemedText style={styles.settingsButtonText}>
            Privacy Policy
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <ThemedText style={styles.settingsButtonText}>FAQ</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <ThemedText style={styles.settingsButtonText}>Contact Us</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <ThemedText style={styles.settingsButtonText}>About Us</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Footer Text */}
      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Adibyas Toure-Travel App for All
        </ThemedText>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make it circular
    backgroundColor: '#ddd',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsContainer: {
    marginTop: 30,
  },
  settingsButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileScreen;
