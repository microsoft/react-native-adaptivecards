import * as React from 'react';
import { TextBlock } from '../../Components/Basic/TextBlock';
import { Row } from '../../Components/Containers/Row';
export class FactView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex },
            React.createElement(TextBlock, { vIndex: 0, hIndex: 0, width: 'auto', textStyle: {
                    color: '#333333',
                } }, element.title),
            React.createElement(TextBlock, { vIndex: 0, hIndex: 1, width: 'auto', textStyle: {
                    color: '#777777',
                } }, element.value)));
    }
}
