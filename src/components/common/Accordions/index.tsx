import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BookingForm from '../BookingForm';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: {
  isExpanded: SharedValue<boolean>;
  children: React.ReactNode;
  viewKey: string;
  style?: any;
  duration?: number;
}) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
      easing: Easing.linear,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}>
      <View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  );
}

export default function Accordion() {
  const items = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    // Add more items as needed
  ];

  const openStates = items.map((item, index) =>
    useSharedValue(index === 0 ? true : false),
  );

  const toggleItem = (index: number) => {
    openStates.forEach((state, i) => {
      state.value = i === index ? !state.value : false;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {items.map((item, index) => {
          const borderRadiusStyle = useAnimatedStyle(() => ({
            borderBottomLeftRadius: withTiming(openStates[index].value ? 0 : 8),
            borderBottomRightRadius: withTiming(
              openStates[index].value ? 0 : 8,
            ),
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }));

          const rotateStyle = useAnimatedStyle(() => ({
            transform: [
              {rotate: withTiming(openStates[index].value ? '180deg' : '0deg')},
            ],
          }));

          return (
            <View key={item.id}>
              <View style={styles.buttonContainer}>
                <AnimatedTouchableOpacity
                  style={[styles.accordionButton, borderRadiusStyle]}
                  onPress={() => toggleItem(index)}>
                  <Text style={styles.btnText}>
                    Passenger {index + 1} - Adult
                  </Text>
                  <Animated.View style={rotateStyle}>
                    <FontAwesome6Icon
                      name="chevron-down"
                      size={20}
                      color={'#ffffff'}
                    />
                  </Animated.View>
                </AnimatedTouchableOpacity>

                <AccordionItem isExpanded={openStates[index]} viewKey={item.id}>
                  <BookingForm />
                </AccordionItem>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 45,
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
