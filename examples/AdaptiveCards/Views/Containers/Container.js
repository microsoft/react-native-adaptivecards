import * as React from 'react';
import { Column } from '../../Abandon/Components/Containers/Column';
import { Row } from '../../Abandon/Components/Containers/Row';
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
        let backgroundColor = StyleManager.getInstance().getBackgroundColor(element.style);
        if (background) {
            return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing), width: 'stretch', height: 'auto', onPress: element.selectAction ? this.onPress : undefined, style: [
                    {
                        backgroundColor: backgroundColor,
                    },
                    this.minHeight
                ] },
                React.createElement(Column, { vIndex: 0, hIndex: 0, width: 'stretch', height: 'auto', vSpacing: 0 }, ContentFactory.createBackgroundImageView(this.renderContents(), background))));
        }
        else {
            return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: StyleManager.getInstance().getSpacing(element.spacing), width: 'stretch', height: 'auto', onPress: element.selectAction ? this.onPress : undefined, style: [
                    {
                        backgroundColor: backgroundColor,
                    },
                    this.minHeight
                ] },
                React.createElement(Column, { vIndex: 0, hIndex: 0, width: 'stretch', height: 'auto', vSpacing: 0 }, this.renderContents())));
        }
    }
    get minHeight() {
        const { element } = this.props;
        if (!element || !element.isValid || !element.items || element.items.length === 0) {
            return { minHeight: 3 };
        }
        else {
            return {};
        }
    }
}
