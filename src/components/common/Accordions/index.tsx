import React, {FC, useRef} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BookingForm from '../BookingForm';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {useAppSelector} from '@utils/hooks';
import AccordionItem from './AccordionItem';

const TravelerAccordion: FC = () => {
  const {airTravelers: items} = useAppSelector(state => state.bookingSlice);
  const scrollViewRef = useRef<ScrollView>(null);
  const itemLayouts = useRef<{[key: string]: number}>({});

  const openStates = items.map(() => useSharedValue(false));

  const toggleItem = (index: number) => {
    // const isOpening = !openStates[index].value;
    openStates.forEach((state, i) => {
      state.value = i === index ? !state.value : false;
    });

    // if (
    //   isOpening &&
    //   scrollViewRef.current &&
    //   itemLayouts.current[items[index].id]
    // ) {
    //   scrollViewRef.current.scrollTo({
    //     y: itemLayouts.current[items[index].id],
    //     animated: true,
    //   });
    // }
  };

  const getBorderRadiusStyle = (isOpen: SharedValue<boolean>) => {
    return useAnimatedStyle(() => ({
      borderBottomLeftRadius: withTiming(isOpen.value ? 0 : 8),
      borderBottomRightRadius: withTiming(isOpen.value ? 0 : 8),
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    }));
  };

  const getRotateStyle = (isOpen: SharedValue<boolean>) => {
    return useAnimatedStyle(() => ({
      transform: [{rotate: withTiming(isOpen.value ? '180deg' : '0deg')}],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        {items.map((item, index) => {
          const borderRadiusStyle = getBorderRadiusStyle(openStates[index]);
          const rotateStyle = getRotateStyle(openStates[index]);

          return (
            <Animated.View
              key={index}
              onLayout={e => {
                itemLayouts.current[index] = e.nativeEvent.layout.y;
              }}>
              <View style={styles.buttonContainer}>
                <AnimatedTouchableOpacity
                  style={[styles.accordionButton, borderRadiusStyle]}
                  onPress={() => toggleItem(index)}>
                  <Text style={styles.btnText}>
                    Passenger {index + 1 < 10 ? '0' + (index + 1) : index + 1}:
                    {item.PassengerType === 'ADT'
                      ? ' Adult'
                      : item.PassengerType === 'CHD'
                        ? ' Child'
                        : ' Infant'}
                  </Text>
                  <Animated.View style={rotateStyle}>
                    <FontAwesome6Icon
                      name="chevron-down"
                      size={20}
                      color={'#ffffff'}
                    />
                  </Animated.View>
                </AnimatedTouchableOpacity>

                <AccordionItem
                  isExpanded={openStates[index]}
                  viewKey={index.toString()}>
                  <BookingForm />
                </AccordionItem>
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 120,
  },
  buttonContainer: {
    paddingBottom: 16,
    display: 'flex',
  },
  content: {
    marginBottom: 16,
  },
  animatedView: {
    overflow: 'hidden',
  },
  wrapper: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
  accordionButton: {
    padding: 16,
    backgroundColor: '#10A5F9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TravelerAccordion;
