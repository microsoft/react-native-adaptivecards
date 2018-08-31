import * as React from 'react';
import { Text, View } from 'react-native';
import { ImageBlock } from '../Basic/ImageBlock';
import { Touchable } from '../Basic/Touchable';
export class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(Touchable, { testId: this.props.title, onPress: this.props.onPress, accessibilityLabel: 'Button ' + this.props.title, style: [
                {
                    flex: this.props.flex,
                    width: this.props.width,
                    height: this.props.height,
                    marginTop: this.props.marginTop,
                    marginRight: this.props.marginRight,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                    paddingTop: this.props.paddingTop,
                    paddingRight: this.props.paddingRight,
                    paddingBottom: this.props.paddingBottom,
                    paddingLeft: this.props.paddingLeft,
                    backgroundColor: this.props.backgroundColor,
                    borderColor: this.props.borderColor,
                    borderRadius: this.props.borderRadius,
                    borderWidth: this.props.borderWidth,
                }, this.props.style
            ] },
            React.createElement(View, { style: {
                    flexDirection: this.layoutDirection,
                    flex: 0,
                    justifyContent: this.props.textVerticalAlign,
                }, pointerEvents: 'none' },
                this.renderIcon(),
                this.renderTitle())));
    }
    renderIcon() {
        if (this.props.icon && this.props.icon.url) {
            if (this.props.icon.type === 'img') {
                return (React.createElement(ImageBlock, { url: this.props.icon.url, width: this.props.icon.width, height: this.props.icon.height, marginTop: this.props.icon.marginTop, marginRight: this.props.icon.marginRight, marginBottom: this.props.icon.marginBottom, marginLeft: this.props.icon.marginLeft }));
            }
            else {
                return (React.createElement(Text, { style: {
                        textAlign: 'center',
                        color: this.props.icon.color,
                        fontSize: this.props.icon.width,
                        fontFamily: this.props.icon.fontFamily,
                        lineHeight: this.props.icon.height,
                        marginTop: this.props.icon.marginTop,
                        marginRight: this.props.icon.marginRight,
                        marginBottom: this.props.icon.marginBottom,
                        marginLeft: this.props.icon.marginLeft,
                    } }, this.props.icon.url));
            }
        }
        return undefined;
    }
    renderTitle() {
        return (React.createElement(Text, { accessible: false, adjustsFontSizeToFit: true, allowFontScaling: true, numberOfLines: 1, style: {
                flex: this.props.flex,
                color: this.props.color,
                fontFamily: this.props.fontFamily,
                fontSize: this.props.fontSize,
                fontWeight: this.props.fontWeight,
                flexWrap: this.props.wrap,
                textAlign: this.props.textHorizontalAlign,
            } }, this.props.title));
    }
    get layoutDirection() {
        if (this.props.icon) {
            switch (this.props.icon.position) {
                case 'top':
                    return 'column';
                case 'bottom':
                    return 'column-reverse';
                case 'left':
                    return 'row';
                case 'right':
                    return 'row-reverse';
                default:
                    return 'row';
            }
        }
        return 'row';
    }
}
