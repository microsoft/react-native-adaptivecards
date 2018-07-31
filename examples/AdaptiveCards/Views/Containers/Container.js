import * as React from 'react';
import { Column } from '../../Components/Containers/Column';
import { Row } from '../../Components/Containers/Row';
import { ActionContext } from '../../Contexts/ActionContext';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
export class ContainerView extends React.Component {
    constructor(props) {
        super(props);
        this.renderContents = () => {
            const { element } = this.props;
            if (!element || !element.isValid) {
                return undefined;
            }
            if (element.items) {
                return element.items.map((content, index) => ContentFactory.createView(content, index, element.style || this.props.theme));
            }
            return undefined;
        };
        this.onPress = () => {
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
            if (callback) {
                callback();
            }
        };
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        const background = element.getBackgroundImageUrl();
        if (background) {
            return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing), width: 'stretch', height: 'auto', onPress: element.selectAction ? this.onPress : undefined, style: { paddingVertical: 4 } },
                React.createElement(Column, { vIndex: 0, hIndex: 0, width: 'stretch', height: 'auto', vSPacing: 0 }, ContentFactory.createBackgroundImageView(this.renderContents(), background))));
        }
        else {
            return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing), width: 'stretch', height: 'auto', onPress: element.selectAction ? this.onPress : undefined, style: { paddingVertical: 4 } },
                React.createElement(Column, { vIndex: 0, hIndex: 0, width: 'stretch', height: 'auto', vSPacing: 0 }, this.renderContents())));
        }
    }
}
