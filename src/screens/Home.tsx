import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from "../constants";  // Assuming icons are exported from the constants folder

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <Image source={icons.Profile} style={styles.iconSize} />
          <Text style={styles.userName}>Guest</Text>
        </View>
        <Image source={icons.Bell} style={styles.iconSize} />
      </View>

      {/* Banner Section */}
      <View style={styles.bannerSection}>
        <Image source={require('../assets/Images/banner.jpg')} style={styles.bannerImage} />
        <Text style={styles.bannerText}>..</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={icons.Plane} style={styles.menuIcon} />
          <Text style={styles.menuText}>Flight</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={icons.Hotel} style={styles.menuIcon} />
          <Text style={styles.menuText}>Hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={icons.Visa} style={styles.menuIcon} />
          <Text style={styles.menuText}>Visa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={icons.Tour} style={styles.menuIcon} />
          <Text style={styles.menuText}>Tour</Text>
        </TouchableOpacity>
      </View>

      {/* Explore Destination Section */}
      <ScrollView style={styles.destinationSection} horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.destinationCard}>
          <Image source={require('../assets/Images/banner.jpg')} style={styles.destinationImage} />
          <Text style={styles.destinationText}>Paris</Text>
          <Text style={styles.destinationSubText}>France - 4.5 ⭐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.destinationCard}>
          <Image source={require('../assets/Images/banner.jpg')} style={styles.destinationImage} />
          <Text style={styles.destinationText}>Bali</Text>
          <Text style={styles.destinationSubText}>Indonesia - 4.5 ⭐</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  bannerSection: {
    marginVertical: 10,
    alignItems: 'center',
  },
  bannerImage: {
    width: '95%',
    height: 200,
    borderRadius: 15,
  },
  bannerText: {
    position: 'absolute',
    top: '40%',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  menuSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: '#FFFF',
    borderRadius: 100,
    height: 84,
    width: 84,
    justifyContent:'center'
  },
  menuText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  menuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  destinationSection: {
    paddingHorizontal: 20,
  },
  destinationCard: {
    width: 190,
    height:210,
    marginRight: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 10,
    elevation: 5,
  },
  destinationImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  destinationSubText: {
    color: '#888',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#E0F7FA',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  iconSize: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default App;
