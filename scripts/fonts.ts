import { Platform, StyleSheet } from 'react-native';

const iosFonts = {
    default: 'Helvetica',
    note: 'Noteworthy-Bold',
    serif: 'Times New Roman',
    sansSerif: 'Helvetica',
    monospace: 'Courier',
};

const androidFonts = {
    default: 'Roboto',
    note: 'XXX',
    serif: 'Roboto',
    sansSerif: 'Roboto',
    monospace: 'monospace',
};

const getFontFamily = (fontFamily) => {
    switch (Platform.OS) {
        case 'ios':
            return iosFonts[fontFamily] || iosFonts.default;
        case 'android':
            return androidFonts[fontFamily] || androidFonts.default;
        default:
            return fontFamily;
    }
};

const fonts = StyleSheet.create({
    default: {
        fontFamily: getFontFamily('default'),
    },
    note: {
        fontFamily: getFontFamily('note'),
    },
    serif: {
        fontFamily: getFontFamily('serif'),
    },
    sansSerif: {
        fontFamily: getFontFamily('sansSerif'),
    },
    monospace: {
        fontFamily: getFontFamily('monospace'),
    },
});

export default fonts;
