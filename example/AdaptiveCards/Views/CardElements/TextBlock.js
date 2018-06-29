import * as React from 'react';
import { TextBlock } from '../../Components/Basic/TextBlock';
import { StyleManager } from '../../Styles/StyleManager';
export class TextBlockView extends React.Component {
    constructor(props) {
        super(props);
        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(TextBlock, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', boxStyle: [
                {
                    backgroundColor: 'transparent'
                }
            ], textStyle: [
                {
                    backgroundColor: 'transparent',
                    fontSize: this.styleConfig.fontSize,
                    fontWeight: this.styleConfig.fontWeight,
                    color: this.styleConfig.color,
                    textAlign: this.styleConfig.textAlign,
                    flexWrap: this.styleConfig.wrap,
                }
            ], horizontalAlign: this.styleConfig.inboxTextAlign, spacing: this.styleConfig.spacing, numberOfLines: element.maxLines }, element.text));
    }
}
