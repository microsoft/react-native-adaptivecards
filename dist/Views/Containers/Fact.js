import * as React from 'react';
import { TextBlock } from '../../Abandon/Components/Basic/TextBlock';
import { Row } from '../../Abandon/Components/Containers/Row';
import { StyleManager } from '../../Styles/StyleManager';
export class FactView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', height: 'auto' },
            React.createElement(TextBlock, { vIndex: 0, hIndex: 0, width: 'auto', textStyle: {
                    color: StyleManager.getInstance().getColor('default', false, this.props.theme),
                    marginRight: 16,
                } }, element.title),
            React.createElement(TextBlock, { vIndex: 0, hIndex: 1, width: 'auto', textStyle: {
                    color: StyleManager.getInstance().getColor('default', true, this.props.theme),
                } }, element.value)));
    }
}
