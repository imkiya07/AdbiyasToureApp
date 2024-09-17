import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={
        colorScheme === 'light'
          ? ['#FCFCFE', '#A3BFF3']
          : ['#A3BFF3', '#FCFCFE']
      }
      style={styles.container}
    >
      <View style={styles.header}>
        <FontAwesome5
          name='user'
          size={24}
          color='black'
          style={styles.guestIcon}
        />
        <FontAwesome5
          name='bell'
          size={24}
          color='black'
          style={styles.notificationIcon}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('@/assets/images/Top Card.png')}
          style={styles.banner}
        />
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Screen/BookFlightScreen')}
          >
            <View style={styles.iconBackground}>
              <FontAwesome5 name='plane' size={30} color='#346AD2' />
            </View>
            <Text style={styles.iconLabel}>Flight</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('/')}
          >
            <View style={styles.iconBackground}>
              <FontAwesome5 name='hotel' size={30} color='#346AD2' />
            </View>
            <Text style={styles.iconLabel}>Hotel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('../Visa/visaScreen')}
          >
            <View style={styles.iconBackground}>
              <FontAwesome5 name='passport' size={30} color='#346AD2' />
            </View>
            <Text style={styles.iconLabel}>Visa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('TourScreen')}
          >
            <View style={styles.iconBackground}>
              <FontAwesome5 name='map-signs' size={30} color='#346AD2' />
            </View>
            <Text style={styles.iconLabel}>Tour</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exploreContainer}>
          <Text style={styles.sectionTitle}>Explore Destination</Text>
          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Image
                source={require('@/assets/images/paris.jpg')}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Paris</Text>
              <Text style={styles.cardSubtitle}>France</Text>
              <Text style={styles.cardRating}>4.5 ★</Text>
            </View>
            <View style={styles.card}>
              <Image
                source={require('@/assets/images/paris.jpg')}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Bali</Text>
              <Text style={styles.cardSubtitle}>Indonesia</Text>
              <Text style={styles.cardRating}>4.5 ★</Text>
            </View>
          </View>
          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Image
                source={require('@/assets/images/paris.jpg')}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Paris</Text>
              <Text style={styles.cardSubtitle}>France</Text>
              <Text style={styles.cardRating}>4.5 ★</Text>
            </View>
            <View style={styles.card}>
              <Image
                source={require('@/assets/images/paris.jpg')}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Bali</Text>
              <Text style={styles.cardSubtitle}>Indonesia</Text>
              <Text style={styles.cardRating}>4.5 ★</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  guestIcon: {
    marginRight: 12,
  },
  notificationIcon: {
    marginLeft: 12,
  },
  banner: {
    marginTop: 20,
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 15,
    marginBottom: 15,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  iconBackground: {
    backgroundColor: '#FFFF',
    borderRadius: 50,
    padding: 18,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  exploreContainer: {
    width: '90%',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -8, // to account for the margins in the cards
  },
  card: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '48%',
    marginBottom: 16,
    marginHorizontal: 8, // ensures 16px gap between cards
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  cardRating: {
    marginTop: 4,
    fontSize: 14,
    color: '#f39c12',
    textAlign: 'center',
  },
});
