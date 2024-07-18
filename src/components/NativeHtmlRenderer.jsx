import { Appearance, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { createElement } from "react";

export const NativeHtmlRenderer = props => {
    const { width } = useWindowDimensions();
    const customMarginSecure = props.customMargin ? props.customMargin : 0;
    const source = {
        html: props.content ? props.content : ""
    };
    const darkMode = Appearance.getColorScheme() === "dark";
    const defaultStyle = {
        body: {
            color: darkMode ? "#FFF" : "#00385A", // Default text color
            maxWidth: width-customMarginSecure
        }
    };
    // The mergeNativeStyles function only includes from the style prop what already exists in the default style.
    let styles = defaultStyle;
    for (const styleItem of props.style) {
        styles = { ...styles, ...styleItem };
    }
    // console.info("Merged styles: " + JSON.stringify(styles));
    let ignoredStyles;
    if (props.ignoredStyles) {
        ignoredStyles = props.ignoredStyles.split(",");
    }
    //console.info("width margin to substract"+(width-customMarginSecure));
    return (
        <RenderHtml
            contentWidth={width-customMarginSecure}
            source={source}
            tagsStyles={styles}
            ignoredStyles={ignoredStyles}
            enableCSSInlineProcessing={props.enableCSSInlineProcessing}
        />
    );
};
