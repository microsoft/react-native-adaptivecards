import * as React from 'react';
import { TextBlock } from '../../Components/Basic/TextBlock';
import { Row } from '../../Components/Containers/Row';
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
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch' },
            React.createElement(TextBlock, { vIndex: 0, hIndex: 0, width: 'stretch', textStyle: {
                    color: StyleManager.getInstance().getColor('default', false, this.props.theme),
                } }, element.title),
            React.createElement(TextBlock, { vIndex: 0, hIndex: 1, width: 'stretch', textStyle: {
                    color: StyleManager.getInstance().getColor('default', true, this.props.theme),
                } }, element.value)));
    }
}
