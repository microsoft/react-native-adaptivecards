import * as React from 'react';
import { Column } from '../../Components/Containers/Column';
import { ActionContext } from '../../Contexts/ActionContext';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
export class ContainerView extends React.Component {
    constructor(props) {
        super(props);
        this.renderContents = () => {
            const { element } = this.props;
            if (!element || !element.isValid()) {
                return undefined;
            }
            if (element.hasItems()) {
                return element.items.map((content, index) => ContentFactory.createView(content, index));
            }
            return undefined;
        };
        this.onPress = () => {
            console.log('ContainerView onPress');
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
            if (callback) {
                callback();
            }
        };
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
        const background = element.getBackgroundImageUrl();
        if (background) {
            return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', onPress: element.selectAction ? this.onPress : undefined, spacing: this.styleConfig.spacing }, ContentFactory.createBackgroundImageView(this.renderContents(), background)));
        }
        else {
            return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', onPress: element.selectAction ? this.onPress : undefined, spacing: this.styleConfig.spacing }, this.renderContents()));
        }
    }
}
