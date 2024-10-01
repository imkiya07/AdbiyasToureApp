import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { icons } from "../constants"; // Ensure icons are correctly imported
import { useNavigation } from "@react-navigation/native";

const App = () => {
   const navigation = useNavigation();

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
        <Text style={styles.bannerText}>Your Next Adventure Awaits</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        <View style={styles.menuItemContainer}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('LayoutScreen')}>
            <Image source={icons.Plane} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.menuText}>Flight</Text>
        </View>

        <View style={styles.menuItemContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HotelScreen')}>
            <Image source={icons.Hotel} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.menuText}>Hotel</Text>
        </View>

        <View style={styles.menuItemContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('VisaScreen')}>
            <Image source={icons.Visa} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.menuText}>Visa</Text>
        </View>

        <View style={styles.menuItemContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TourScreen')}>
            <Image source={icons.Tour} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.menuText}>Tour</Text>
        </View>
      </View>

      {/* Explore Destination */}
      <Text style={styles.exploreText}>Explore Destination</Text>

      {/* Explore Destination Section */}
      <ScrollView style={styles.destinationSection} horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.destinationCard}>
          <Image source={require('../assets/Images/banner.jpg')} style={styles.destinationImage} />
          <Text style={styles.destinationText}>Paris</Text>
          <Text style={styles.destinationSubText}>France - 4.5 ⭐⭐⭐⭐</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.destinationCard}>
          <Image source={require('../assets/Images/banner.jpg')} style={styles.destinationImage} />
          <Text style={styles.destinationText}>Bali</Text>
          <Text style={styles.destinationSubText}>Indonesia - 4.5 ⭐⭐⭐⭐</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.destinationCard}>
          <Image source={require('../assets/Images/banner.jpg')} style={styles.destinationImage} />
          <Text style={styles.destinationText}>Dubai</Text>
          <Text style={styles.destinationSubText}>UAE - 4.5 ⭐⭐⭐⭐</Text>
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
    padding: 30,
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
    marginVertical: 20,
    alignItems: 'center',
  },
  bannerImage: {
    width: '95%',
    height: 230,
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
    marginVertical: 40,
  },
  menuItemContainer: {
    alignItems: 'center',
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: '#FFFF',
    borderRadius: 100,
    height: 84,
    width: 84,
    justifyContent: 'center',
  },
  menuText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  menuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  exploreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
  destinationSection: {
    paddingHorizontal: 20,
  },
  destinationCard: {
    width: 190,
    height: 210,
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
  iconSize: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default App;
