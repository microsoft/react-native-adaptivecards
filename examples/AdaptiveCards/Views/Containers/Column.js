import * as React from 'react';
import { Column } from '../../Components/Containers/Column';
import { ActionContext } from '../../Contexts/ActionContext';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
export class ColumnView extends React.Component {
    constructor(props) {
        super(props);
        this.renderContents = () => {
            const { element } = this.props;
            if (!element || !element.isValid) {
                return undefined;
            }
            if (element.items) {
                return element.items.map((content, index) => ContentFactory.createView(content, index, this.props.theme));
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
            return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: StyleManager.getInstance().getColumnWidth(element), height: 'auto', onPress: element.selectAction ? this.onPress : undefined, vSPacing: StyleManager.getInstance().getSpacing(element.spacing), hSpacing: 16 }, ContentFactory.createBackgroundImageView(this.renderContents(), background)));
        }
        else {
            return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: StyleManager.getInstance().getColumnWidth(element), height: 'auto', onPress: element.selectAction ? this.onPress : undefined, vSPacing: StyleManager.getInstance().getSpacing(element.spacing), hSpacing: 16 }, this.renderContents()));
        }
    }
}
