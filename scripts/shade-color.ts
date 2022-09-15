/**
 * 1st PARAM — Accepts a hexidecimal color that you'd like to darken or lighten
 * 2nd PARAM — Percentage that you'd like to lighten (positive number) or darken (negative number), which
 * is generally between -100 and 100, but you can go higher/lower than those numbers
 * RETURNS — returns altered color
 */
const ShadeColor = (incomingColor: string, percent: number) => {
    try {
        let color = incomingColor;
        if (incomingColor[0] !== '#') {
            color = `#${incomingColor}`;
        }
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt((R * (100 + percent)) / 100);
        G = parseInt((G * (100 + percent)) / 100);
        B = parseInt((B * (100 + percent)) / 100);

        R = R < 255 ? R : 255;
        G = G < 255 ? G : 255;
        B = B < 255 ? B : 255;

        var RR =
            R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
        var GG =
            G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
        var BB =
            B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

        return '#' + RR + GG + BB;
    } catch {
        return '#C1C1C1'; // IF THERE'S AN ERROR, THEN RETURN GREY :)
    }
};
export default ShadeColor;




















