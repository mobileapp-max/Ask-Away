import { Dimensions, Platform, PixelRatio } from 'react-native';
import { colors } from '../assets/colors';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const scale = windowWidth / 414;

export const nullProfileImageLink = "https://www.inta.org/wp-content/uploads/2020/05/No-Image-Avatar-32.png"
// export const responsiveWidth = percentage => windowWidth / 100 * percentage

export function responsiveWidth(percentage) {
    if (Platform.OS === 'android') {
        return (PixelRatio.roundToNearestPixel(percentage * scale * 4.2))
    } else {
        return windowWidth / 100 * percentage
    }
}

export function responsiveHeight(percentage) {
    if (Platform.OS === 'android') {
        return (PixelRatio.roundToNearestPixel(percentage * scale * 8))
    } else {
        return windowHeight / 100 * percentage
    }
}

export function responsiveSize(number) {
    return windowHeight / windowWidth * number
}

export const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

export function responsiveFontSize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return (PixelRatio.roundToNearestPixel(newSize))
    } else {
        return (PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
export const shadow = (multiplier) => ({
    shadowColor: colors.black,
    shadowRadius: 1 * multiplier,
    shadowOffset: { width: 0, height: 1 * multiplier },
    shadowOpacity: 0.3 * multiplier,
    elevation: 2,
});