/*
* Some Components need to render in unique ways in some screens
* Presets help us reuse most of the component while creating unique variations of it
* Use this file to create your own presets, where needed.
* Remember! NOT ALL COMPONENTS NEED PRESET. This file is here to help you, so don't feel like you need to use it!
*/
import { TextStyle } from "react-native";
import Translation from '../../utils/translation/translation';
import { responsiveFontSize, responsiveWidth } from '../../theme/constants';

export const PopupAlertPresets = {
  default: {
    sampleData: [
      {
        title: "PopupAlert Title 1",
        text: "PopupAlert Description 2"
      },
      {
        title: "PopupAlert Title 2",
        text: "PopupAlert Description 2"
      }
    ],
    sampleOnPressItem: (item) => console.log("item pressed", item),
    presetStyles: {
      title: {
        color: '#ffffff',
        fontFamily: 'AvenirNext-Bold',
        fontSize: responsiveFontSize(16),
        marginBottom: responsiveWidth(1)
      },
      text: {
        color: '#c1c1c1',
        fontFamily: 'AvenirNext-Medium',
        fontSize: responsiveFontSize(12),
        marginBottom: responsiveWidth(1)
      },
      item: {
        backgroundColor: '#282D3390',
        borderRadius: responsiveWidth(3),
        marginBottom: responsiveWidth(5),
        marginHorizontal: responsiveWidth(7)
      },
      outer: {
        backgroundColor: '#c1c1c1',
        marginHorizontal: responsiveWidth(7)
      }
    } as TextStyle
  },
  secondary: {
    sampleData: [
      {
        title: "PopupAlert POSITIVE Title 1",
        text: "PopupAlert NEGATIVE Description 2"
      },
      {
        title: "PopupAlert POSITIVE Title 2",
        text: "PopupAlert NEGATIVE Description 2"
      }
    ],
    sampleOnPressItem: (item) => console.log("item pressed", item),
    presetStyles: {
      title: {
        color: '#72FA41',
        fontFamily: 'AvenirNext-Bold',
        fontSize: responsiveFontSize(16),
        marginBottom: responsiveWidth(1)
      },
      text: {
        color: '#FF3C59',
        fontFamily: 'AvenirNext-Medium',
        fontSize: responsiveFontSize(12),
        marginBottom: responsiveWidth(1)
      },
      item: {
        backgroundColor: '#282D3390',
        borderRadius: responsiveWidth(3),
        marginBottom: responsiveWidth(5),
        marginHorizontal: responsiveWidth(7)
      },
      outer: {
        backgroundColor: '#c1c1c1',
        marginHorizontal: responsiveWidth(7)
      }
    } as TextStyle
  }
}
export type PopupAlertPresetNames = keyof typeof PopupAlertPresets