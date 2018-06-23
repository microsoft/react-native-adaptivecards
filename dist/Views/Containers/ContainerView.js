import React from 'react';
import { View, } from 'react-native';
import { ContainerStyle } from '../../Shared/Enums';
import { ContentFactory } from '../Factories/ContentFactory';
import { DecStyleManager } from '../Styles/DecStyleManager';
export class ContainerView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = DecStyleManager.getInstance().getStyle();
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }
        return (React.createElement(View, { style: [{
                    flex: 1,
                },
                this.getContainerStyle(element.style)
            ] }, element.items.map((contentElement, index) => ContentFactory.createView(contentElement, index, false))));
    }
    getContainerStyle(style) {
        let containerStyle;
        switch (style) {
            case ContainerStyle.Emphasis:
                containerStyle = {
                    backgroundColor: this.styleConfig.container.backgroundColor,
                };
                break;
            case ContainerStyle.Default:
            default:
                break;
        }
        return containerStyle;
    }
}
