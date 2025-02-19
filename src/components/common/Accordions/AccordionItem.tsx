import {Platform, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {tAccordionItem} from '@utils/types';

const AccordionItem: FC<tAccordionItem> = ({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}) => {
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
          const additionalHeight = Platform.OS === 'ios' ? 600 : 0;
          height.value = e.nativeEvent.layout.height + additionalHeight;
        }}
        style={styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  animatedView: {
    overflow: 'hidden',
  },
  wrapper: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
});
