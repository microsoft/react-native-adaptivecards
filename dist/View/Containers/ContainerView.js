import React from 'react';
import { View, } from 'react-native';
import { ContainerStyle } from '../../Shared/Enums';
import { DecCardElementView } from '../Basic/DecCardElementView';
import { DecCardElementWrapper } from '../Basic/DecCardElementWrapper';
import { StyleManager } from '../Styles/StyleManager';
export class ContainerView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = StyleManager.getInstance().getStyle();
    }
    render() {
        const { element, index } = this.props;
        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }
        return (React.createElement(DecCardElementWrapper, { element: element, index: index, style: {
                flex: 1,
            } },
            React.createElement(View, { style: [{
                        flex: 1,
                    },
                    this.getContainerStyle(element.style)
                ] }, element.items.map((cardElement, index) => React.createElement(DecCardElementView, { key: 'containerItems' + index, index: index, element: cardElement })))));
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
