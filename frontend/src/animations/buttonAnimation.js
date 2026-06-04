import { Animated } from "react-native";

export const pressInAnimation = (scaleValue) => {
  Animated.spring(scaleValue, {
    toValue: 0.9,
    useNativeDriver: true,
  }).start()
}

export const pressOutAnimation = (scaleValue) => {
  Animated.spring(scaleValue, {
    toValue: 1,
    useNativeDriver: true,
  }).start()
}