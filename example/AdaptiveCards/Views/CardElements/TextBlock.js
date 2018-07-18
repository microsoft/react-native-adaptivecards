import * as React from 'react';
import { TextBlock } from '../../Components/Basic/TextBlock';
import { StyleManager } from '../../Styles/StyleManager';
export class TextBlockView extends React.Component {
    constructor(props) {
        super(props);
        const { element } = this.props;
        if (element && element.isValid) {
            this.style = StyleManager.getInstance().getTextStyle(element, this.props.theme);
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(TextBlock, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', fontSize: this.style.fontSize, fontWeight: this.style.fontWeight, color: this.style.color, backgroundColor: 'transparent', textAlign: this.style.textAlign, wrap: this.style.wrap, horizontalAlign: this.style.inboxTextAlign, spacing: this.style.spacing, numberOfLines: element.maxLines }, element.text));
    }
}
