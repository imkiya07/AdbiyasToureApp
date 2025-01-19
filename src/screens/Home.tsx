import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {icons} from '../constants'; // Ensure icons are correctly imported
import {tMainTabsProps, tMenuItems} from '@utils/types';
import {useAppDispatch, useAppSelector} from '@utils/hooks';
import {generatePassengerForm} from '@store/slice/bookingSlice';
import {resetAllState} from '@store/slice/flightType';

const menuItems: tMenuItems[] = [
  {
    route: 'LayoutScreen',
    icon: icons.Plane,
    title: 'Flight',
    id: 'LayoutScreenFlightPlane',
  },
  {
    route: 'LayoutHotel',
    icon: icons.Hotel,
    title: 'Hotel',
    id: 'LayoutHotelHotel',
  },
  {
    route: 'LayoutVisa',
    icon: icons.Visa,
    title: 'Visa',
    id: 'LayoutVisaVisa',
  },
  {
    route: 'LayoutTour',
    icon: icons.Tour,
    title: 'Tour',
    id: 'LayoutTourTour',
  },
];

const App: FC<tMainTabsProps> = ({navigation}) => {
  const {adults, children, infants} = useAppSelector(
    state => state.passengerSlice,
  );
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView className="flex-1 bg-[#E0F7FA] ">
      <ScrollView>
        {/* Header Section */}
        <View className="flex-row justify-between items-center p-7 ">
          <View className="flex-row items-center ">
            <Image source={icons.Profile} style={styles.iconSize} />
            <Text className="font-bold text-lg text-[#333333] ml-3 ">
              Guest
            </Text>
          </View>
          <Image source={icons.Bell} style={styles.iconSize} />
        </View>

        {/* Banner Section */}
        <View style={styles.bannerSection}>
          <Image
            source={require('../assets/Images/banner.jpg')}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}></Text>
        </View>

        {/* <TestRedux /> */}

        {/* Menu Section */}
        <View className="flex-row my-10 justify-evenly ">
          {menuItems.map(item => (
            <View key={item.id} style={styles.menuItemContainer}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(resetAllState());
                  navigation.navigate(item.route as any);
                }}
                className="items-center bg-white rounded-full justify-center w-24 h-24 ">
                <Image source={item.icon} style={styles.menuIcon} />
              </TouchableOpacity>
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Explore Destination */}
        <Text style={styles.exploreText}>Explore Destination</Text>

        {/* Explore Destination Section */}
        <ScrollView
          style={styles.destinationSection}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.destinationCard}>
            <Image
              source={require('../assets/Images/banner.jpg')}
              style={styles.destinationImage}
            />
            <Text style={styles.destinationText}>Paris</Text>
            <Text style={styles.destinationSubText}>France - 4.5 ⭐⭐⭐⭐</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.destinationCard}>
            <Image
              source={require('../assets/Images/banner.jpg')}
              style={styles.destinationImage}
            />
            <Text style={styles.destinationText}>Bali</Text>
            <Text style={styles.destinationSubText}>
              Indonesia - 4.5 ⭐⭐⭐⭐
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.destinationCard}>
            <Image
              source={require('../assets/Images/banner.jpg')}
              style={styles.destinationImage}
            />
            <Text style={styles.destinationText}>Dubai</Text>
            <Text style={styles.destinationSubText}>UAE - 4.5 ⭐⭐⭐⭐</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.exploreText}>Hot Deals</Text>
        <ScrollView
          style={styles.destinationSection}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.destinationCard}>
            <Image
              source={require('../assets/Images/banner.jpg')}
              style={styles.destinationImage}
            />
            <Text style={styles.destinationText}>Paris</Text>
            <Text style={styles.destinationSubText}>France - 4.5 ⭐⭐⭐⭐</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.destinationCard}>
            <Image
              source={require('../assets/Images/banner.jpg')}
              style={styles.destinationImage}
            />
            <Text style={styles.destinationText}>Bali</Text>
            <Text style={styles.destinationSubText}>
              Indonesia - 4.5 ⭐⭐⭐⭐
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.destinationCard}>
            <Image
              source={require('../assets/Images/banner.jpg')}
              style={styles.destinationImage}
            />
            <Text style={styles.destinationText}>Dubai</Text>
            <Text style={styles.destinationSubText}>UAE - 4.5 ⭐⭐⭐⭐</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    textShadowOffset: {width: 1, height: 1},
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
    marginBottom: 20,
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
