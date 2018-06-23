import React from 'react';
import { StyleManager } from '../../Styles/StyleManager';
import { CardText } from '../Basic/CardText';
import { FlexBox } from '../Basic/FlexBox';
export class TextBlockView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getStyle = () => {
            return {
                backgroundColor: 'transparent',
                fontSize: this.styleConfig.fontSize,
                fontWeight: this.styleConfig.fontWeight,
                color: this.styleConfig.color,
                textAlign: this.styleConfig.textAlign,
                flexWrap: this.styleConfig.wrap,
            };
        };
        this.styleConfig = StyleManager.getInstance().getStyle(this.props.element);
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(FlexBox, { index: this.props.index, size: 'auto', spacing: this.styleConfig.spacing, align: 'auto' },
            React.createElement(CardText, { style: [
                    this.getStyle()
                ], numberOfLines: element.maxLines || undefined }, element.text)));
    }
}
