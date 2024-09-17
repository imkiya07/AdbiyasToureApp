import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const deals = [
  {
    id: 1,
    title: 'ALASKA KENAI & DENALI ADVENTURE',
    description:
      'Everything was great organized, our CEO Megan was so kind and well prepared!',
    price: '$2,397',
    image: require('@/assets/images/bail.jpeg'),
  },
  {
    id: 2,
    title: 'ALASKA KENAI & DENALI ADVENTURE',
    description:
      'Everything was great organized, our CEO Megan was so kind and well prepared!',
    price: '$2,397',
    image: require('@/assets/images/paris.jpg'),
  },
  {
    id: 3,
    title: 'ALASKA KENAI & DENALI ADVENTURE',
    description:
      'Everything was great organized, our CEO Megan was so kind and well prepared!',
    price: '$2,397',
    image: require('@/assets/images/bail.jpeg'),
  },
  {
    id: 4,
    title: 'ALASKA KENAI & DENALI ADVENTURE',
    description:
      'Everything was great organized, our CEO Megan was so kind and well prepared!',
    price: '$2,397',
    image: require('@/assets/images/bail.jpeg'),
  },
  // Add more deals as needed
];

const DealsScreen = () => {
  return (
    <ThemedView style={styles.container}>
      {/* Header Tabs */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.tabActive}>
          <ThemedText style={styles.tabTextActive}>UPDATES</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabActive}>
          <ThemedText style={styles.tabTextInactive}>OFFERS</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Deals List */}
      <ScrollView contentContainerStyle={styles.dealsContainer}>
        {deals.map((deal) => (
          <View key={deal.id} style={styles.dealCard}>
            <Image source={deal.image} style={styles.dealImage} />
            <View style={styles.dealInfo}>
              <ThemedText style={styles.dealTitle}>{deal.title}</ThemedText>
              <ThemedText style={styles.dealDescription}>
                {deal.description}
              </ThemedText>
              <View style={styles.dealFooter}>
                <ThemedText style={styles.dealPrice}>{deal.price}</ThemedText>
                <TouchableOpacity style={styles.bookButton}>
                  <ThemedText style={styles.bookButtonText}>
                    BOOK NOW
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Search Flights Button */}
      <TouchableOpacity style={styles.searchButton}>
        <ThemedText style={styles.searchButtonText}>SEARCH FLIGHTS</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4A90E2',
    paddingVertical: 40,
    paddingRight: 40,
    paddingLeft: 40,
  },
  tabActive: {
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#FFF',
  },
  tabInactive: {
    paddingHorizontal: 20,
  },
  tabTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabTextInactive: {
    color: '#B0C4DE',
    fontSize: 16,
  },
  dealsContainer: {
    padding: 20,
  },
  dealCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  dealImage: {
    width: '100%',
    height: 150,
  },
  dealInfo: {
    padding: 15,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dealDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealPrice: {
    fontSize: 16,
    color: '#E91E63',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    margin: 20,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DealsScreen;
