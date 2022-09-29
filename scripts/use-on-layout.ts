/* 
* Export a single function in this file
* to be used in tests and interactions with state.
*/

import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

/**
 * Write a JSDoc explanaition of your util here
 */
const UseOnLayout = () => {

    const [currentHeightOfView, setCurrentHeightOfView] = useState(0);
    const [currentWidthOfView, setCurrentWidthOfView] = useState(0);

    const captureView = (event: LayoutChangeEvent) => {
        const { height, width } = event.nativeEvent.layout;
        setCurrentWidthOfView(width);
        setCurrentHeightOfView(height);
    };

    return {
        currentHeightOfView,
        currentWidthOfView,
        captureView
    }

}
export default UseOnLayout