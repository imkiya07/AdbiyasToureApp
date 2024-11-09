import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';

// Define props type for TabIcon component
type TabIconProps = {
  icon: any; // Define more specific type if possible
  color: string;
  focused: boolean;
};

// TabIcon component for rendering tab icons
const TabIcon: FC<TabIconProps> = ({icon, color, focused}) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.iconImage, {tintColor: color}]} // Apply dynamic tint color
      />
    </View>
  );
};

// Stylesheet for consistent styling and better performance
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});

export default TabIcon;
