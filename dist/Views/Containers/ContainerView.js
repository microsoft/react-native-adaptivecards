import React from 'react';
import { View, } from 'react-native';
import { ContainerStyle } from '../../Shared/Enums';
import { ContentElementView } from '../Factories/ContentElementView';
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
            ] }, element.items.map((cardElement, index) => React.createElement(ContentElementView, { key: 'containerItems' + index, index: index, element: cardElement }))));
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
