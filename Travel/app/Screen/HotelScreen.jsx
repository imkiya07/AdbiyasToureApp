import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const hotels = [
  {
    id: 1,
    name: 'Hotel Sunshine',
    location: 'New York, USA',
    price: '$200/night',
    rating: 4.5,
    image: 'https://example.com/hotel1.jpg',
  },
  {
    id: 2,
    name: 'Sea Breeze Resort',
    location: 'Malibu, USA',
    price: '$350/night',
    rating: 4.7,
    image: 'https://example.com/hotel2.jpg',
  },
  // Add more hotel data here
];

const HotelBookingScreen = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Hotel Booking" />
      </Appbar.Header>
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search for hotels..." />
        <FontAwesome5 name="search" size={20} style={styles.searchIcon} />
      </View>
      <ScrollView>
        {hotels.map(hotel => (
          <Card key={hotel.id} style={styles.hotelCard}>
            <Card.Cover source={{ uri: hotel.image }} />
            <Card.Content>
              <Title>{hotel.name}</Title>
              <Paragraph>{hotel.location}</Paragraph>
              <View style={styles.detailsRow}>
                <Text style={styles.price}>{hotel.price}</Text>
                <View style={styles.rating}>
                  <FontAwesome5 name="star" size={16} color="#FFD700" />
                  <Text>{hotel.rating}</Text>
                </View>
              </View>
              <Button mode="contained" style={styles.bookButton}>Book Now</Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
    color: '#555',
  },
  hotelCard: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#3b5998',
  },
});

export default HotelBookingScreen;
